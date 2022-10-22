import { IsNotEmpty, IsEnum, IsNumber, IsEmpty } from 'class-validator';
import { TCategory } from '../types/service.types';

const categories: TCategory[] = ['readingList', 'like'];

export interface IAddReactionDto {
  category: TCategory;
  postId: number;
  userId: number;
}

export class AddReactionDto implements IAddReactionDto {
  @IsEnum(categories)
  category: TCategory;

  @IsNumber()
  @IsNotEmpty()
  postId: number;

  @IsEmpty()
  userId: number = undefined;
}
