import { PrismaService } from '../database/prisma.service';
import { ISingupDto } from '../auth/dto/signup.dto';
import { User } from '@prisma/client';

interface ICreateResponse {
  id: number;
  email: string;
  role: string;
}

export interface IUserRepository {
  create(data: ISingupDto): Promise<ICreateResponse>;
  getByEmail(email: string): Promise<User | null>;
  update(): Promise<any>;
  delete(userId: number): Promise<void>;
}

export class UserRepository implements IUserRepository {
  constructor(private _db: PrismaService) {}

  async create(data: ISingupDto): Promise<ICreateResponse> {
    return await this._db.user.create({
      data,
      select: { id: true, email: true, role: true },
    });
  }

  async getByEmail(email: string): Promise<User | null> {
    return await this._db.user.findUnique({
      where: { email },
    });
  }

  async update(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async delete(userId: number): Promise<void> {
    await this._db.user.delete({
      where: { id: userId },
    });
    return;
  }
}
