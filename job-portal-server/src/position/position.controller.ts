import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { PositionService } from './position.service';
import { EditPositionDto, PositionDto } from './dto/position.dto';
import { Position } from '../model/position.entity';

@Controller('position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Post()
  async create(@Body() positionDto: PositionDto): Promise<Position> {
    try {
      return await this.positionService.create(positionDto);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get()
  async getAll() {
    try {
      return await this.positionService.getAll();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Patch('/:id')
  async editPosition(
    @Body() positionDto: EditPositionDto,
    @Param('id') id: string,
  ): Promise<Position> {
    try {
      return await this.positionService.editPosition(positionDto, id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete('/:id')
  async deletePosition(@Param('id') id: string) {
    try {
      return await this.positionService.deletePosition(id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
