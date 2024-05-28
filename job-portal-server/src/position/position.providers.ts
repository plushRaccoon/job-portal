import { DataSource } from 'typeorm';
import { Position } from '../model/position.entity';

export const positionProviders = [
  {
    provide: 'POSITION_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Position),
    inject: ['DATA_SOURCE'],
  },
];
