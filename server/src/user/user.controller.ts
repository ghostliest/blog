import { Controller, HttpException, HttpStatus, UsePipes, Delete } from '@nestjs/common';
import { ValidationPipe } from '../pipes/validation.pipe';
import { UserService } from './user.service';
import { ServiceException } from 'src/exceptions/service.exception';
import { Auth } from 'src/common/decorators/auth.decorator';
import { IJwtUser } from 'src/common/interfaces/jwt-user.interface';
import { User } from 'src/common/decorators/user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Auth()
  @UsePipes(ValidationPipe)
  @Delete()
  async delete(@User() user: IJwtUser) {
    try {
      return await this._userService.delete(user.id);
    } catch (error) {
      if (error instanceof ServiceException) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
