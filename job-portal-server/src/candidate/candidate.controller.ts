import {
  Controller,
  Post,
  Body,
  HttpException,
  Patch,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { CandidateDto } from './dto/candidate.dto';

@Controller('candidate')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @Post()
  async create(@Body() candidateDto: CandidateDto) {
    try {
      return await this.candidateService.create(candidateDto);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get()
  async getAllCandidates() {
    try {
      return await this.candidateService.getAllCandidates();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Patch('/:id')
  async editCandidate(
    @Param('id') id: string,
    @Body() candidateDto: CandidateDto,
  ) {
    try {
      return await this.candidateService.editCandidate(id, candidateDto);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete('/:id')
  async deleteCandidate(@Param('id') id: string) {
    try {
      return await this.candidateService.deleteCandidate(id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
