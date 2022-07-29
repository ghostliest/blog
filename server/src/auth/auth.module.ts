import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [
    {
      provide: AuthService,
      useFactory: (userService, jwtService) => new AuthService(userService, jwtService),
      inject: [UserService, JwtService],
    },
  ],
})
export class AuthModule {}
