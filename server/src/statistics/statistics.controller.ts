import { Controller, Get, HttpException, HttpStatus, Query, UsePipes } from '@nestjs/common';
import { ServiceException } from 'src/exceptions/service.exception';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { GetStatisticsQueryDto } from './dto/getStatisticsQuery.dto';
import { StatisticsService } from './statistics.service';
import { GetAuthorStatisticsQueryDto } from './dto/getAuthorStatisticsQuery.dto';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly _statisticsService: StatisticsService) {}

  @UsePipes(ValidationPipe)
  @Get('authors-top')
  async authorsTop(@Query() dto: GetStatisticsQueryDto) {
    try {
      return await this._statisticsService.authorsTop(dto);
    } catch (error) {
      if (error instanceof ServiceException) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @UsePipes(ValidationPipe)
  @Get('author')
  async author(@Query() dto: GetAuthorStatisticsQueryDto) {
    try {
      return await this._statisticsService.author(dto);
    } catch (error) {
      if (error instanceof ServiceException) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
