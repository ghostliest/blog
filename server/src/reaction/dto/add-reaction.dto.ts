import { IsNotEmpty, IsEnum, IsNumber, IsEmpty } from 'class-validator';

type categoriesType = 'readinglist' | 'like';
const categories: categoriesType[] = ['readinglist', 'like'];

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
