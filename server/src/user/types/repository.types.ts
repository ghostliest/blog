import { User } from '@prisma/client';
import { ISingupDto } from 'src/auth/dto/signup.dto';

export interface IUserRepository {
  create(data: ISingupDto): Promise<ICreateResponse>;
  getByEmail(email: string): Promise<TGetByResponse>;
  getById(id: number): Promise<TGetByResponse>;
  update(): Promise<any>;
  delete(userId: number): Promise<void>;
}

export interface ICreateResponse {
  id: number;
  email: string;
  role: string;
}

export type TGetByResponse = User | null;
