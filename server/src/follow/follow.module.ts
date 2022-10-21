import { Module } from '@nestjs/common';
import { DATABASE, DatabaseModule } from 'src/database/database.module';
import { FollowService } from './follow.service';
import { FollowController } from './follow.controller';
import { FollowRepository } from './follow.repository';
import { IFollowRepository } from './types/repository.types';

@Module({
  imports: [DatabaseModule],
  controllers: [FollowController],
  providers: [
    {
      provide: FollowService,
      useFactory: (followRepository: IFollowRepository) => new FollowService(followRepository),
      inject: ['FOLLOW_REPO'],
    },
    {
      provide: 'FOLLOW_REPO',
      useFactory: (db) => new FollowRepository(db),
      inject: [DATABASE],
    },
  ],
  exports: [FollowService],
})
export class FollowModule {}
