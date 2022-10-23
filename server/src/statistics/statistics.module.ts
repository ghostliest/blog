import { Module } from '@nestjs/common';
import { DATABASE, DatabaseModule } from 'src/database/database.module';
import { IStatisticsRepository } from './types/repository.types';
import { StatisticsController } from './statistics.controller';
import { StatisticsRepository } from './statistics.repository';
import { StatisticsService } from './statistics.service';

@Module({
  imports: [DatabaseModule],
  controllers: [StatisticsController],
  providers: [
    {
      provide: StatisticsService,
      useFactory: (statisticsRepository: IStatisticsRepository) =>
        new StatisticsService(statisticsRepository),
      inject: ['STATISTICS_REPO'],
    },
    {
      provide: 'STATISTICS_REPO',
      useFactory: (db) => new StatisticsRepository(db),
      inject: [DATABASE],
    },
  ],
  exports: [StatisticsService],
})
export class StatisticsModule {}
