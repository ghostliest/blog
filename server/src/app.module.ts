import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from './database/database.module';
import { FilesModule } from './files/files.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

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
    DatabaseModule,
    FilesModule,
    PostModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
