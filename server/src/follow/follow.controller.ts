import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { Auth } from 'src/common/decorators/auth.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { IJwtUser } from 'src/common/interfaces/jwt-user.interface';
import { ServiceException } from 'src/exceptions/service.exception';
import { CheckFollowQueryDto } from './dto/checkFollowQuery.dto';
import { CreateFollowDto } from './dto/createFollow.dto';
import { FollowService } from './follow.service';
import { CountFollowQueryDto } from './dto/countFollowQuery.dto';

@Controller('follow')
export class FollowController {
  constructor(private readonly _followService: FollowService) {}

  @Auth()
  @UsePipes(ValidationPipe)
  @Post()
  async createOrDelete(@Body() dto: CreateFollowDto, @User() user: IJwtUser) {
    try {
      return await this._followService.createOrDelete({ ...dto, userId: user.id });
    } catch (error) {
      if (error instanceof ServiceException) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @Auth()
  @UsePipes(ValidationPipe)
  @Get()
  async check(@Query() dto: CheckFollowQueryDto, @User() user: IJwtUser) {
    try {
      return await this._followService.check({ ...dto, userId: user.id });
    } catch (error) {
      if (error instanceof ServiceException) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @UsePipes(ValidationPipe)
  @Get('count')
  async count(@Query() dto: CountFollowQueryDto) {
    try {
      return await this._followService.count(dto);
    } catch (error) {
      if (error instanceof ServiceException) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
