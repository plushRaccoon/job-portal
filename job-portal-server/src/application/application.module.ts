import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { applicationProviders } from './application.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ApplicationController],
  providers: [ApplicationService, ...applicationProviders],
})
export class ApplicationModule {}
