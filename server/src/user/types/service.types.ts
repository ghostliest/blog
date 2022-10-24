import { ISingupDto } from 'src/auth/dto/signup.dto';
import { ICreateResponse, TGetByResponse } from './repository.types';

export interface IUserService {
  create(data: ISingupDto): Promise<ICreateResponse>;
  getByEmail(email: string): Promise<TGetByResponse>;
  getByIdMini(id: number): Promise<TGetByIdMiniResponse>;
  delete(userId: number): Promise<IDeleteUserResponse>;
}

export type TGetByIdMiniResponse =
  | {
      id: number;
      firstname: string;
      lastname: string;
      email: string;
      createAt: Date;
    }
  | { user: null };

export interface IDeleteUserResponse {
  result: 'ok';
}
