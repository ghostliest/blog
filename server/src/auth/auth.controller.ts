import { Body, Controller, Get, HttpException, HttpStatus, Post, UsePipes } from '@nestjs/common';
import { ServiceException } from 'src/exceptions/service.exception';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { SingupDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { Auth } from '../common/decorators/auth.decorator';
import { IJwtUser } from '../common/interfaces/jwt-user.interface';
import { User } from 'src/common/decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @UsePipes(ValidationPipe)
  @Post('signup')
  async signup(@Body() dto: SingupDto) {
    try {
      return await this._authService.signup(dto);
    } catch (error) {
      if (error instanceof ServiceException) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @UsePipes(ValidationPipe)
  @Post('signin')
  async signin(@Body() dto: SigninDto) {
    try {
      return await this._authService.signin(dto);
    } catch (error) {
      if (error instanceof ServiceException) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @Auth()
  @Get('refresh')
  async refresh(@User() user: IJwtUser) {
    return await this._authService.refresh(user);
  }
}
