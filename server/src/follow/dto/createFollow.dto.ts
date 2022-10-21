import { IsNumber, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export interface ICreateFollowDto {
  followedId: number;
  userId: number;
}

export class CreateFollowDto implements ICreateFollowDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  followedId: number;

  userId: number;
}
