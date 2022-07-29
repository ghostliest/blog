import { IsEmpty, IsNotEmpty, IsNumber } from 'class-validator';

export interface IGetReactionDto {
  postId: number;
  userId: number;
}

export class GetReactionDto implements IGetReactionDto {
  @IsNumber()
  @IsNotEmpty()
  postId: number;

  @IsEmpty()
  userId: number = null;
}
