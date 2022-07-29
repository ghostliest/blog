import { IsString, IsNotEmpty } from 'class-validator';

export interface ICreateCategoryDto {
  value: string;
}

export class CreateCategoryDto implements ICreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  value: string;
}
