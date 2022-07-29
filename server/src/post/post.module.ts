import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { IPostRepository, PostRepository } from './post.repository';
import { IFilesService } from 'src/files/files.service';
import { FilesModule, FILES_SERVICE } from 'src/files/files.module';
import { DATABASE, DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule, FilesModule],
  controllers: [PostController],
  providers: [
    {
      provide: PostService,
      useFactory: (postRepository: IPostRepository, filesService: IFilesService) =>
        new PostService(postRepository, filesService),
      inject: ['POST_REPO', FILES_SERVICE],
    },
    {
      provide: 'POST_REPO',
      useFactory: (db) => new PostRepository(db),
      inject: [DATABASE],
    },
  ],
  exports: [PostService],
})
export class PostModule {}
