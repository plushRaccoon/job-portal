import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';

import { EditPositionDto, PositionDto } from './dto/position.dto';
import { Position } from '../model/position.entity';
import { PositionStatusEnum } from '../constants/enums';

@Injectable()
export class PositionService {
  constructor(
    @Inject('POSITION_REPOSITORY')
    private positionRepo: Repository<Position>,
  ) {}
  async create(positionDto: PositionDto) {
    const createdPosition = await this.positionRepo.save({
      ...positionDto,
      status: PositionStatusEnum.OPEN,
    });

    return createdPosition;
  }

  async getAll() {
    const positionsWithApplications = await this.positionRepo.find({
      relations: ['applications', 'applications.candidate'],
    });

    return positionsWithApplications;
  }

  async editPosition(positionDto: EditPositionDto, id: string) {
    const position = await this.positionRepo.findOne({ where: { id } });

    if (!position) {
      throw new NotFoundException('Position not found');
    }

    if (positionDto.title === '') {
      position.status = positionDto.status;
    }

    position.title = positionDto.title;
    position.status = positionDto.status;

    return await this.positionRepo.save(position);
  }

  async deletePosition(id: string) {
    const position = await this.positionRepo.findOne({
      where: { id },
      relations: {
        applications: true,
      },
    });

    if (!position) {
      throw new NotFoundException('Position not found');
    }

    if (position.applications.length) {
      throw new ForbiddenException('Cannot delete position with applications');
    }

    await this.positionRepo.remove(position);

    return { message: 'Position deleted' };
  }
}
