import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export interface IGetAuthorStatisticsQueryDto {
  authorId: number;
}

export class GetAuthorStatisticsQueryDto implements IGetAuthorStatisticsQueryDto {
  @IsNotEmpty()
  @Type(() => Number)
  authorId: number;
}
