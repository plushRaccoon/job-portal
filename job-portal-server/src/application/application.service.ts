import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ApplicationDto, EditApplicationDto } from './dto/application.dto';
import { Application } from '../model/application.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ApplicationService {
  constructor(
    @Inject('APPLICATION_REPOSITORY')
    private applicationRepo: Repository<Application>,
  ) {}

  async create(applicationDto: ApplicationDto, positionId: string) {
    const application = await this.applicationRepo.create({
      ...applicationDto,
      candidate: { id: applicationDto.candidateId },
      position: { id: positionId },
    });

    return await this.applicationRepo.save(application);
  }

  async editApplication(
    applicationDto: EditApplicationDto,
    applicationId: string,
  ) {
    const application = await this.applicationRepo.findOne({
      where: {
        id: applicationId,
      },
    });

    if (!application) {
      throw new BadRequestException('Application not found');
    }

    application.cv = applicationDto.cv;

    return await this.applicationRepo.save(application);
  }

  async deleteApplication(applicationId: string) {
    const application = await this.applicationRepo.findOne({
      where: {
        id: applicationId,
      },
    });

    if (!application) {
      throw new BadRequestException('Application not found');
    }

    await this.applicationRepo.remove(application);

    return { message: 'Application deleted' };
  }
}
