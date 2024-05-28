import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { PositionModule } from './position/position.module';
import { ApplicationModule } from './application/application.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database/dataSource';
import { CandidateModule } from './candidate/candidate.module';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    PositionModule,
    ApplicationModule,
    CandidateModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
