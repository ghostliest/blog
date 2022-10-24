import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export interface IGetLastActivityReactionDto {
  page: number;
  limit: number;
}

export class GetLastActivityReactionDto implements IGetLastActivityReactionDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  page: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  limit: number;
}
