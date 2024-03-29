import { Module } from '@nestjs/common';
import { ReactionController } from './reaction.controller';
import { ReactionService } from './reaction.service';
import { ReactionRepository } from './reaction.repository';
import { DATABASE, DatabaseModule } from '../database/database.module';
import { IReactionRepository } from './types/repository.types';

@Module({
  imports: [DatabaseModule],
  controllers: [ReactionController],
  providers: [
    {
      provide: ReactionService,
      useFactory: (reactionRepository: IReactionRepository) =>
        new ReactionService(reactionRepository),
      inject: ['REACTION_REPO'],
    },
    {
      provide: 'REACTION_REPO',
      useFactory: (db) => new ReactionRepository(db),
      inject: [DATABASE],
    },
  ],
  exports: [ReactionService],
})
export class ReactionModule {}
