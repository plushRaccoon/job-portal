import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CandidateDto } from './dto/candidate.dto';
import { Candidate } from '../model/candidate.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CandidateService {
  constructor(
    @Inject('CANDIDATE_REPOSITORY')
    private candidateRepo: Repository<Candidate>,
  ) {}

  async create(candidateDto: CandidateDto) {
    try {
      const candidate = this.candidateRepo.create({
      ...candidateDto,
    });

      return await this.candidateRepo.save(candidate);
    } catch (error) {
      throw new BadRequestException('Candidate already exists');
    }
  }

  async getAllCandidates() {
    return await this.candidateRepo.find({
      relations: ['applications', 'applications.position'],
    });
  }

  async editCandidate(id: string, candidateDto: CandidateDto) {
    const candidate = await this.candidateRepo.findOne({
      where: { id },
    });

    if (!candidate) {
      throw new NotFoundException();
    }

    candidate.firstName = candidateDto.firstName;
    candidate.lastName = candidateDto.lastName;
    candidate.email = candidateDto.email;
    candidate.phone = candidateDto.phone;

    return await this.candidateRepo.save(candidate);
  }

  async deleteCandidate(id: string) {
    const candidate = await this.candidateRepo.findOne({
      where: { id },
      relations: {
        applications: true,
      },
    });

    if (!candidate) {
      throw new NotFoundException();
    }
    if (candidate.applications.length) {
      throw new ForbiddenException('Cannot delete candidate with applications');
    }

    await this.candidateRepo.remove(candidate);

    return { message: 'Candidate deleted' };
  }
}
