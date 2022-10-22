import { Module } from '@nestjs/common';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { ReactionModule } from 'src/reaction/reaction.module';
import { FollowModule } from 'src/follow/follow.module';
import { ReactionService } from 'src/reaction/reaction.service';
import { FollowService } from '../follow/follow.service';
import { IFollowService } from 'src/follow/types/service.types';
import { IReactionService } from 'src/reaction/types/service.types';

@Module({
  imports: [ReactionModule, FollowModule],
  controllers: [ActivityController],
  providers: [
    {
      provide: ActivityService,
      useFactory: (reactionService: IReactionService, followService: IFollowService) =>
        new ActivityService(reactionService, followService),
      inject: [ReactionService, FollowService],
    },
  ],
})
export class ActivityModule {}
