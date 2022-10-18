import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { DATABASE, DatabaseModule } from 'src/database/database.module';
import { FilesModule, FILES_SERVICE } from 'src/files/files.module';
import { PostModule } from 'src/post/post.module';
import { IPostService, PostService } from 'src/post/post.service';
import { IFilesService } from 'src/files/files.service';
import { IUserRepository } from './types/repository.types';

@Module({
  imports: [DatabaseModule, PostModule, FilesModule],
  controllers: [UserController],
  providers: [
    {
      provide: UserService,
      useFactory: (
        userRepository: IUserRepository,
        postService: IPostService,
        filesService: IFilesService,
      ) => new UserService(userRepository, postService, filesService),
      inject: ['USER_REPO', PostService, FILES_SERVICE],
    },
    {
      provide: 'USER_REPO',
      useFactory: (db) => new UserRepository(db),
      inject: [DATABASE],
    },
  ],
  exports: [UserService],
})
export class UserModule {}
