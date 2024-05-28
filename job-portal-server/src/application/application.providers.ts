import { DataSource } from 'typeorm';
import { Application } from '../model/application.entity';

export const applicationProviders = [
  {
    provide: 'APPLICATION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Application),
    inject: ['DATA_SOURCE'],
  },
];
