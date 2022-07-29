import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { Auth } from 'src/common/decorators/auth.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { IJwtUser } from 'src/common/interfaces/jwt-user.interface';
import { ServiceException } from 'src/exceptions/service.exception';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CreatePostDto } from './dto/create-post.dto';
import { GetAllPostQueryDto } from './dto/get-all-post-query.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly _postService: PostService) {}

  @Auth()
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('img'))
  @Post()
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreatePostDto,
    @User() user: IJwtUser,
  ) {
    try {
      return await this._postService.create(file, { ...dto, userId: user.id });
    } catch (error) {
      if (error instanceof ServiceException) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this._postService.getOne(id);
    } catch (error) {
      if (error instanceof ServiceException) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @Get()
  @UsePipes(ValidationPipe)
  async getAll(@Query() dto: GetAllPostQueryDto) {
    try {
      return await this._postService.getAll(dto);
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
  @Delete()
  async delete(@Body() dto: { id: number }) {
    try {
      return await this._postService.delete(dto.id);
    } catch (error) {
      if (error instanceof ServiceException) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
