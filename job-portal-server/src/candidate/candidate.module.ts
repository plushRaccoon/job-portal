import { Module } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { CandidateController } from './candidate.controller';
import { DatabaseModule } from '../database/database.module';
import { candidateProviders } from './candidate.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CandidateController],
  providers: [CandidateService, ...candidateProviders],
})
export class CandidateModule {}
