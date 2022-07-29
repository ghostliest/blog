import { Module } from '@nestjs/common';
import { ReactionController } from './reaction.controller';
import { ReactionService } from './reaction.service';
import { IReactionRepository, ReactionRepository } from './reaction.repository';
import { DATABASE, DatabaseModule } from '../database/database.module';

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
})
export class ReactionModule {}
