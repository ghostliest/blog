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
import { Auth } from 'src/common/decorators/auth.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { IJwtUser } from 'src/common/interfaces/jwt-user.interface';
import { ServiceException } from 'src/exceptions/service.exception';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { ReactionService } from './reaction.service';
import { AddReactionDto } from './dto/add-reaction.dto';
import { GetReactionDto } from './dto/get-reaction.dto';

@Controller('reaction')
export class ReactionController {
  constructor(private readonly _reactionService: ReactionService) {}

  @Auth()
  @UsePipes(ValidationPipe)
  @Post()
  async addOrDelete(@Body() dto: AddReactionDto, @User() user: IJwtUser) {
    try {
      return await this._reactionService.addOrDelete({ ...dto, userId: user.id });
    } catch (error) {
      if (error instanceof ServiceException) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @UsePipes(ValidationPipe)
  @Get()
  async get(@Query() dto: GetReactionDto) {
    try {
      return await this._reactionService.get(dto);
    } catch (error) {
      if (error instanceof ServiceException) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
