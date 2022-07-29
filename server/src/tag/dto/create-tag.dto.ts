import { IsString, IsNotEmpty } from 'class-validator';

export interface ICreateTagDto {
  value: string;
}

export class CreateTagDto implements ICreateTagDto {
  @IsString()
  @IsNotEmpty()
  value: string;
}
