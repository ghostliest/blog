import { IsNumber, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export interface ICheckFollowQueryDto {
  followedId: number;
  userId: number;
}

export class CheckFollowQueryDto implements ICheckFollowQueryDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  followedId: number;

  userId: number;
}
