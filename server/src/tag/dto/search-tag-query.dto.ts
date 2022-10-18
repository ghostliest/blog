import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export interface ISearchTagQueryDto {
  limit: number;
  value: string;
}

export class SearchTagQueryDto implements ISearchTagQueryDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  limit: number;

  @IsString()
  @IsNotEmpty()
  value: string;
}
