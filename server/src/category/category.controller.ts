import { Body, Controller, Get, HttpException, HttpStatus, Post, UsePipes } from '@nestjs/common';
import { Auth } from 'src/common/decorators/auth.decorator';
import { ServiceException } from 'src/exceptions/service.exception';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly _categoryService: CategoryService) {}

  @Auth('ADMIN')
  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() dto: CreateCategoryDto) {
    try {
      return await this._categoryService.create(dto);
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
      return await this._categoryService.getAll();
    } catch (error) {
      if (error instanceof ServiceException) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
