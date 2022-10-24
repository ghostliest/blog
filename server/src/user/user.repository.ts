import { PrismaService } from '../database/prisma.service';
import { ISingupDto } from '../auth/dto/signup.dto';
import { ICreateResponse, IUserRepository, TGetByResponse } from './types/repository.types';

export class UserRepository implements IUserRepository {
  constructor(private _db: PrismaService) {}

  async create(data: ISingupDto): Promise<ICreateResponse> {
    return await this._db.user.create({
      data,
      select: { id: true, email: true, role: true },
    });
  }

  async getByEmail(email: string): Promise<TGetByResponse> {
    return await this._db.user.findUnique({
      where: { email },
    });
  }

  async getById(id: number): Promise<TGetByResponse> {
    return await this._db.user.findUnique({ where: { id } });
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
