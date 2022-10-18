import { IsNotEmpty, IsEnum, IsNumber, IsEmpty } from 'class-validator';

type categoriesType = 'readingList' | 'like';
const categories: categoriesType[] = ['readingList', 'like'];

export interface IAddReactionDto {
  category: categoriesType;
  postId: number;
  userId: number;
}

export class AddReactionDto implements IAddReactionDto {
  @IsEnum(categories)
  category: categoriesType;

  @IsNumber()
  @IsNotEmpty()
  postId: number;

  @IsEmpty()
  userId: number = null;
}
