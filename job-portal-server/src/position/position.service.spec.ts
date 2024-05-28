import { Test, TestingModule } from '@nestjs/testing';
import { PositionService } from './position.service';
import { PositionDto, EditPositionDto } from './dto/position.dto';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Position } from '../model/position.entity';
import { PositionStatusEnum } from '../constants/enums';
import { mockRepository } from '../constants/mockRepository';
import { Application } from '../model/application.entity';

describe('PositionService', () => {
  let service: PositionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PositionService,
        {
          provide: 'POSITION_REPOSITORY',
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<PositionService>(PositionService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a position and return its data', async () => {
      const mockPositionDto: PositionDto = {
        title: 'Software Engineer',
      };
      const mockCreatedPosition = {
        ...mockPositionDto,
        status: PositionStatusEnum.OPEN,
      };
      mockRepository.save.mockResolvedValue(mockCreatedPosition);

      const result = await service.create(mockPositionDto);

      expect(result).toBe(mockCreatedPosition);
      expect(mockRepository.save).toHaveBeenCalledWith({
        ...mockPositionDto,
        status: PositionStatusEnum.OPEN,
      });
    });
  });

  describe('getAll', () => {
    it('should return all positions with their applications and candidates', async () => {
      const mockPositions = [new Position(), new Position()];
      mockRepository.find.mockResolvedValue(mockPositions);

      const result = await service.getAll();

      expect(result).toBe(mockPositions);
      expect(mockRepository.find).toHaveBeenCalledWith({
        relations: ['applications', 'applications.candidate'],
      });
    });
  });

  describe('editPosition', () => {
    const mockPositionDto: EditPositionDto = {
      title: 'Junior Web Developer',
      status: PositionStatusEnum.OPEN,
    };
    const mockPositionId: string = 'mockPositionId';

    [
      { ...mockPositionDto },
      {
        title: '',
        status: PositionStatusEnum.CLOSED,
      },
    ].forEach((mockPositionDto) => {
      it('should return a position with title and/or status updated', async () => {
        const mockPosition = new Position();
        mockPosition.title = 'Web Developer';

        mockRepository.findOne.mockResolvedValueOnce(mockPosition);
        mockRepository.save.mockResolvedValueOnce(mockPosition);

        const result = await service.editPosition(
          mockPositionDto,
          mockPositionId,
        );

        expect(result).toBe(mockPosition);
        expect(mockRepository.findOne).toHaveBeenCalledWith({
          where: { id: mockPositionId },
        });
        expect(mockRepository.save).toHaveBeenCalledWith(
          mockPositionDto.title
            ? {
                ...mockPosition,
                title: mockPositionDto.title,
                status: mockPositionDto.status,
              }
            : {
                ...mockPosition,
                title: mockPosition.title,
                status: mockPositionDto.status,
              },
        );
      });
    });

    it('should throw NotFoundException if position not found', async () => {
      mockRepository.findOne.mockResolvedValueOnce(null);

      await expect(
        service.editPosition(mockPositionDto, mockPositionId),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deletePosition', () => {
    const mockPositionId: string = 'mockPositionId';

    it('should delete a position and return success message', async () => {
      const mockPosition = new Position();
      mockPosition.applications = [];
      mockRepository.findOne.mockResolvedValueOnce(mockPosition);

      const result = await service.deletePosition(mockPositionId);

      expect(result).toEqual({ message: 'Position deleted' });
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockPositionId },
        relations: { applications: true },
      });
      expect(mockRepository.remove).toHaveBeenCalledWith(mockPosition);
    });

    it('should throw NotFoundException if position not found', async () => {
      mockRepository.findOne.mockResolvedValueOnce(null);

      await expect(service.deletePosition(mockPositionId)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw ForbiddenException if position has applications', async () => {
      const mockPosition = new Position();
      mockPosition.applications = [new Application()];
      mockRepository.findOne.mockResolvedValueOnce(mockPosition);

      await expect(service.deletePosition(mockPositionId)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });
});
