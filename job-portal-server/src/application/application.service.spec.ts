import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationService } from './application.service';
import { ApplicationDto, EditApplicationDto } from './dto/application.dto';
import { BadRequestException } from '@nestjs/common';
import { Application } from '../model/application.entity';
import { mockRepository } from '../constants/mockRepository';

describe('ApplicationService', () => {
  let service: ApplicationService;
  const cv: string =
    'Effectively managed team of over 270 employees in 12 locations in 3 countries. Oversaw executive leadership, company training, and public relations with media. Developed intensive, ambitious business strategies, short-term goals, and long-term objectives. Spearheaded overhaul of various underperforming departments to reduce stagnation and increase growth and productivity. Fostered change in company culture to be more open, transparent, and accountable.';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApplicationService,
        {
          provide: 'APPLICATION_REPOSITORY',
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ApplicationService>(ApplicationService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an application and return its data', async () => {
      const mockApplicationDto: ApplicationDto = {
        candidateId: '63e0f2f1-1d5f-4348-b115-86ad134f4651',
        cv,
      };
      const mockPositionId: string = 'mockPositionId';
      const mockApplication = new Application();
      mockRepository.create.mockReturnValue(mockApplication);
      mockRepository.save.mockResolvedValue(mockApplication);

      const result = await service.create(mockApplicationDto, mockPositionId);

      expect(result).toBe(mockApplication);
      expect(mockRepository.create).toHaveBeenCalledTimes(1);
      expect(mockRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('editApplication', () => {
    const mockApplicationDto: EditApplicationDto = { cv };
    const mockApplicationId: string = 'mockApplicationId';

    it('should return an updated application', async () => {
      const mockApplication = new Application();

      mockRepository.findOne.mockResolvedValueOnce(mockApplication);
      mockRepository.save.mockResolvedValueOnce(mockApplication);

      await service.editApplication(mockApplicationDto, mockApplicationId);

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockApplicationId },
      });
      expect(mockRepository.save).toHaveBeenCalled();
    });

    it('should throw BadRequestException if application not found', async () => {
      mockRepository.findOne.mockResolvedValueOnce(null);

      await expect(
        service.editApplication(mockApplicationDto, mockApplicationId),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('deleteApplication', () => {
    const mockApplicationId: string = 'mockApplicationId';

    it('should delete an application and return success message', async () => {
      const mockApplication = new Application();
      mockRepository.findOne.mockResolvedValueOnce(mockApplication);

      const result = await service.deleteApplication(mockApplicationId);

      expect(result).toEqual({ message: 'Application deleted' });
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockApplicationId },
      });
      expect(mockRepository.remove).toHaveBeenCalled();
    });

    it('should throw BadRequestException if application not found', async () => {
      mockRepository.findOne.mockResolvedValueOnce(null);

      await expect(
        service.deleteApplication(mockApplicationId),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
