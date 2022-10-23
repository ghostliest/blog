import { IsNotEmpty, IsEnum } from 'class-validator';

export type TSort = 'day' | 'week' | 'month';
const sortArr: TSort[] = ['day', 'week', 'month'];

export interface IGetStatisticsQueryDto {
  sort: TSort;
}

export class GetStatisticsQueryDto implements IGetStatisticsQueryDto {
  @IsNotEmpty()
  @IsEnum(sortArr)
  sort: TSort;
}
