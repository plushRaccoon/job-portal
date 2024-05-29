import { Test, TestingModule } from '@nestjs/testing';
import { CandidateService } from './candidate.service';
import { CandidateDto } from './dto/candidate.dto';
import {
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { Candidate } from '../model/candidate.entity';
import { Application } from '../model/application.entity';
import { mockRepository } from '../constants/mockRepository';

describe('CandidateService', () => {
  let service: CandidateService;
  const mockCandidateDto: CandidateDto = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '1234567890',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CandidateService,
        {
          provide: 'CANDIDATE_REPOSITORY',
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CandidateService>(CandidateService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a candidate and return its data', async () => {
      const mockCandidate = new Candidate();
      mockRepository.create.mockReturnValue(mockCandidate);
      mockRepository.save.mockResolvedValue(mockCandidate);

      const result = await service.create(mockCandidateDto);

      expect(result).toBe(mockCandidate);
      expect(mockRepository.create).toHaveBeenCalledWith(mockCandidateDto);
      expect(mockRepository.save).toHaveBeenCalledWith(mockCandidate);
    });

    it('should throw BadRequestException if candidate already exists', async () => {
      mockRepository.create.mockImplementation(() => {
        throw new BadRequestException();
      });

      await expect(service.create(mockCandidateDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('getAllCandidates', () => {
    it('should return all candidates with their applications and positions', async () => {
      const mockCandidates = [new Candidate(), new Candidate()];
      mockRepository.find.mockResolvedValue(mockCandidates);

      const result = await service.getAllCandidates();

      expect(result).toBe(mockCandidates);
      expect(mockRepository.find).toHaveBeenCalledWith({
        relations: ['applications', 'applications.position'],
      });
    });
  });

  describe('editCandidate', () => {
    const mockCandidateId: string = 'mockCandidateId';

    it('should return an updated candidate', async () => {
      const mockCandidate = new Candidate();

      mockRepository.findOne.mockResolvedValueOnce(mockCandidate);
      mockRepository.save.mockResolvedValueOnce(mockCandidate);

      const result = await service.editCandidate(
        mockCandidateId,
        mockCandidateDto,
      );

      expect(result).toBe(mockCandidate);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockCandidateId },
      });
      expect(mockRepository.save).toHaveBeenCalledWith(mockCandidate);
    });

    it('should throw NotFoundException if candidate not found', async () => {
      mockRepository.findOne.mockResolvedValueOnce(null);

      await expect(
        service.editCandidate(mockCandidateId, mockCandidateDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteCandidate', () => {
    const mockCandidateId: string = 'mockCandidateId';

    it('should delete a candidate and return success message', async () => {
      const mockCandidate = new Candidate();
      mockCandidate.applications = [];
      mockRepository.findOne.mockResolvedValueOnce(mockCandidate);

      const result = await service.deleteCandidate(mockCandidateId);

      expect(result).toEqual({ message: 'Candidate deleted' });
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockCandidateId },
        relations: { applications: true },
      });
      expect(mockRepository.remove).toHaveBeenCalledWith(mockCandidate);
    });

    it('should throw NotFoundException if candidate not found', async () => {
      mockRepository.findOne.mockResolvedValueOnce(null);

      await expect(service.deleteCandidate(mockCandidateId)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw ForbiddenException if candidate has applications', async () => {
      const mockCandidate = new Candidate();
      mockCandidate.applications = [new Application()];
      mockRepository.findOne.mockResolvedValueOnce(mockCandidate);

      await expect(service.deleteCandidate(mockCandidateId)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });
});
