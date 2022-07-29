import { IsEmail, IsString, Length } from 'class-validator';

export interface ISingupDto {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
}

export class SingupDto implements ISingupDto {
  @IsEmail({}, { message: 'incorrect email' })
  @IsString()
  email: string;

  @Length(2, 10, { message: 'from 2 to 10 characters' })
  @IsString()
  firstname: string;

  @Length(2, 10, { message: 'from 2 to 10 characters' })
  @IsString()
  lastname: string;

  @Length(4, 16, { message: 'from 4 to 16 characters' })
  @IsString()
  password: string;
}
