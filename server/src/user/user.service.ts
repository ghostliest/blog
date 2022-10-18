import { IPostService } from 'src/post/post.service';
import { IFilesService } from 'src/files/files.service';
import { ISingupDto } from 'src/auth/dto/signup.dto';
import { IDeleteUserResponse, TGetByIdMiniResponse, IUserService } from './types/service.types';
import { ICreateResponse, IUserRepository, TGetByResponse } from './types/repository.types';

export class UserService implements IUserService {
  constructor(
    private readonly _repo: IUserRepository,
    private readonly _postService: IPostService,
    private readonly _filesService: IFilesService,
  ) {}

  async create(data: ISingupDto): Promise<ICreateResponse> {
    return await this._repo.create(data);
  }

  async getByEmail(email: string): Promise<TGetByResponse> {
    return await this._repo.getByEmail(email);
  }

  async getByIdMini(id: number): Promise<TGetByIdMiniResponse> {
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

  async delete(userId: number): Promise<IDeleteUserResponse> {
    const imgs = await this._postService.getAllImgByUserId(userId);
    for (const { img } of imgs) {
      await this._filesService.delete(img, 'post');
    }
    await this._repo.delete(userId);
    return { result: 'ok' };
  }
}
