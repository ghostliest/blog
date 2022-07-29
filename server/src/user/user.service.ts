import { User, Prisma } from '@prisma/client';
import { IUserRepository } from './user.repository';
import { IPostService } from 'src/post/post.service';
import { IFilesService } from 'src/files/files.service';

export interface IUserService {
  create(data: Prisma.UserCreateInput): Promise<{ id: number; role: string; email: string }>;
  getByEmail(email: string): Promise<User | null>;
  delete(userId: number): Promise<{ result: string }>;
}

export class UserService implements IUserService {
  constructor(
    private readonly _repo: IUserRepository,
    private readonly _postService: IPostService,
    private readonly _filesService: IFilesService,
  ) {}

  async create(data: Prisma.UserCreateInput): Promise<{ id: number; role: string; email: string }> {
    return await this._repo.create(data);
  }

  async getByEmail(email: string): Promise<User | null> {
    return await this._repo.getByEmail(email);
  }

  async delete(userId: number): Promise<{ result: string }> {
    const imgs = await this._postService.getAllImgByUserId(userId);
    for (const { img } of imgs) {
      await this._filesService.delete(img, 'post');
    }
    await this._repo.delete(userId);
    return { result: 'ok' };
  }
}
