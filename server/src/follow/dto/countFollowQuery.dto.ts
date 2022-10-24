import { IsNumber, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export interface ICountFollowQueryDto {
  authorId: number;
}

export class CountFollowQueryDto implements ICountFollowQueryDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  authorId: number;
}
