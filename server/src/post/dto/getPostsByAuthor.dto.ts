import { IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export interface IGetPostsByAuthorDto {
  authorId: number;
  page: number;
  limit: number;
}

export class GetPostsByAuthorDto implements IGetPostsByAuthorDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  authorId: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  page: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  limit: number;
}
