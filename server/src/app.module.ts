import * as path from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from './database/database.module';
import { FilesModule } from './files/files.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { TagModule } from './tag/tag.module';
import { ReactionModule } from './reaction/reaction.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FollowModule } from './follow/follow.module';
import { ActivityModule } from './activity/activity.module';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    {
      ...JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: '1d',
        },
      }),
      global: true,
    },
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', 'static'),
    }),
    DatabaseModule,
    FilesModule,
    PostModule,
    UserModule,
    AuthModule,
    CategoryModule,
    TagModule,
    ReactionModule,
    FollowModule,
    ActivityModule,
    StatisticsModule,
  ],
})
export class AppModule {}
