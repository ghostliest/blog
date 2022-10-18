import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export interface ISearchCategoryQueryDto {
  limit: number;
  value: string;
}

export class SearchCategoryQueryDto implements ISearchCategoryQueryDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  limit: number;

  @IsString()
  @IsNotEmpty()
  value: string;
}
