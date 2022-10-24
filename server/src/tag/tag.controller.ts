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
import { ServiceException } from 'src/exceptions/service.exception';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { Auth } from 'src/common/decorators/auth.decorator';
import { SearchTagQueryDto } from './dto/search-tag-query.dto';

@Controller('tag')
export class TagController {
  constructor(private readonly _tagService: TagService) {}

  @Auth('ADMIN')
  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() dto: CreateTagDto) {
    try {
      return await this._tagService.create(dto);
    } catch (error) {
      if (error instanceof ServiceException) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @Get()
  async getAll() {
    try {
      return await this._tagService.getAll();
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
  @Get('search')
  async search(@Query() dto: SearchTagQueryDto) {
    try {
      return await this._tagService.search(dto);
    } catch (error) {
      if (error instanceof ServiceException) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
