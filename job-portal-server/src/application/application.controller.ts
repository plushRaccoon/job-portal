import {
  Controller,
  Post,
  Body,
  Param,
  HttpException,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationDto, EditApplicationDto } from './dto/application.dto';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post('/:positionId')
  async create(
    @Param('positionId') positionId: string,
    @Body() applicationDto: ApplicationDto,
  ) {
    try {
      return await this.applicationService.create(applicationDto, positionId);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Patch('/:id')
  async editApplication(
    @Param('id') id: string,
    @Body() applicationDto: EditApplicationDto,
  ) {
    try {
      return await this.applicationService.editApplication(applicationDto, id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete('/:id')
  async deleteApplication(@Param('id') id: string) {
    try {
      return await this.applicationService.deleteApplication(id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
