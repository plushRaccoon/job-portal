import { DataSource } from 'typeorm';
import { dataSourceOptions } from './dataSource';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource(dataSourceOptions);

      return dataSource.initialize();
    },
  },
];
