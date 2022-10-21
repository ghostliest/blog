import { Controller, Get, HttpException, HttpStatus, Query, UsePipes } from '@nestjs/common';
import { ServiceException } from 'src/exceptions/service.exception';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { ActivityService } from './activity.service';
import { GetLastActivityReactionDto } from './dto/GetLastActivityReactionQuery.dto';

@Controller('activity')
export class ActivityController {
  constructor(private readonly _activityService: ActivityService) {}

  @UsePipes(ValidationPipe)
  @Get()
  async get(@Query() dto: GetLastActivityReactionDto) {
    try {
      return await this._activityService.get(dto);
    } catch (error) {
      if (error instanceof ServiceException) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
