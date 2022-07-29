import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TagRepository, ITagRepository } from './tag.repository';
import { DATABASE, DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TagController],
  providers: [
    {
      provide: TagService,
      useFactory: (tagRepository: ITagRepository) => new TagService(tagRepository),
      inject: ['TAG_REPO'],
    },
    {
      provide: 'TAG_REPO',
      useFactory: (db) => new TagRepository(db),
      inject: [DATABASE],
    },
  ],
})
export class TagModule {}
