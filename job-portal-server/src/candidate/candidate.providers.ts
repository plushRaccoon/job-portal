import { DataSource } from 'typeorm';
import { Candidate } from '../model/candidate.entity';

export const candidateProviders = [
  {
    provide: 'CANDIDATE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Candidate),
    inject: ['DATA_SOURCE'],
  },
];
