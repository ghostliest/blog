import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export interface IGetReactionDto {
  postId: number;
  userId?: number;
}

export class GetReactionDto implements IGetReactionDto {
  @IsNotEmpty()
  @Type(() => Number)
  postId: number;

  @IsOptional()
  @Type(() => Number)
  userId?: number;
}
