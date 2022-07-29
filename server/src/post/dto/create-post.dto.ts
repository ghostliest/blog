import {
  IsString,
  Length,
  IsNumber,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  IsNotEmpty,
  IsEmpty,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';

type Status = 'DRAFT' | 'ACTIVE' | 'BLOCKED';

export interface ICreatePostDto {
  title: string;
  description: string;
  content: string;
  img: string;
  status: Status;
  userId: number;
  categoryId: number;
  tags: number[];
}

export class CreatePostDto implements ICreatePostDto {
  @Length(20, 50, { message: 'from 20 to 50 characters' })
  @IsString()
  title: string;

  @Length(50, 100, { message: 'from 50 to 100 characters' })
  @IsString()
  description: string;

  @Length(300, 10000, { message: 'from 300 to 10000 characters' })
  @IsString()
  content: string;

  @IsEmpty()
  img: string = null;

  @IsNotEmpty()
  status: Status;

  @IsEmpty()
  userId: number = null;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @Transform(({ value }) => JSON.parse(value) || null)
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  tags: number[];
}
