import { IsEmail, IsString, Length } from 'class-validator';

export interface ISigninDto {
  email: string;
  password: string;
}

export class SigninDto implements ISigninDto {
  @IsEmail({}, { message: 'incorrect email' })
  @IsString()
  email: string;

  @Length(4, 16, { message: 'from 4 to 16 characters' })
  @IsString()
  password: string;
}
