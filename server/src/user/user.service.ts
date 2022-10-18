import { User, Prisma } from '@prisma/client';
import { IUserRepository } from './user.repository';
import { IPostService } from 'src/post/post.service';
import { IFilesService } from 'src/files/files.service';

export interface IUserService {
  create(data: Prisma.UserCreateInput): Promise<{ id: number; role: string; email: string }>;
  getByEmail(email: string): Promise<User | null>;
  getByIdMini(id: number): Promise<GetByIdMiniResponse>;
  delete(userId: number): Promise<{ result: string }>;
}

type GetByIdMiniResponse =
  | {
      id: number;
      firstname: string;
      lastname: string;
      email: string;
      createAt: Date;
    }
  | { user: null };

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

  async getByIdMini(id: number): Promise<GetByIdMiniResponse> {
    const user = await this._repo.getById(id);
    if (user?.id) {
      return {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        createAt: user.createAt,
      };
    } else {
      return { user: null };
    }
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
