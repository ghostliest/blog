import { IFilesService } from '../files/files.service';
import { ServiceException } from 'src/exceptions/service.exception';
import { IGetAllPostQueryDto } from './dto/get-all-post-query.dto';
import { IGetAllUserPostsDto } from './dto/get-all-user-posts.dto';
import { IGetPostsByAuthorDto } from './dto/getPostsByAuthor.dto';
import { Post } from '@prisma/client';
import {
  ICreate,
  IDeleteResponse,
  IGetOne,
  IPostService,
  IUpdate,
  TCountByStatusResponse,
} from './types/service.types';
import {
  IGetAllResponse,
  IGetAllUserPostsResponse,
  IGetByAuthorResponse,
  IGetOneResponse,
  IPostRepository,
  TGetAllImgByUserId,
} from './types/repository.types';

export class PostService implements IPostService {
  constructor(
    private readonly _repo: IPostRepository,
    private readonly _filesService: IFilesService,
  ) {}

  async create({ file, dto }: ICreate): Promise<Post> {
    const isExists = await this._repo.checkByTitle(dto.title);

    if (isExists) {
      throw new ServiceException('Post with this title already exists');
    } else {
      const fileName = await this._filesService.create(file, 'post');
      return await this._repo.create({ ...dto, img: fileName });
    }
  }

  async update({ id, file, dto }: IUpdate): Promise<Post> {
    const post = await this._repo.getOne(id);

    if (post.user.id === dto.userId) {
      let fileName;
      if (post.img !== file.originalname) {
        await this._filesService.delete(post.img, 'post');
        fileName = await this._filesService.create(file, 'post');
      }
      const img = fileName || post.img;
      return this._repo.update(id, { ...dto, img });
    } else {
      throw new ServiceException('Error');
    }
  }

  async getOne({ id, userId = undefined }: IGetOne): Promise<IGetOneResponse> {
    // TODO
    const post = await this._repo.getOne(id);
    if (post?.id && (post.user.id === userId || post.status === 'ACTIVE')) {
      return post;
    }
    throw new ServiceException('Not found');
  }

  async getByAuthor(dto: IGetPostsByAuthorDto): Promise<IGetByAuthorResponse> {
    return await this._repo.getByAuthor(dto);
  }

  async getAll(dto: IGetAllPostQueryDto): Promise<IGetAllResponse> {
    return await this._repo.getAll(dto);
  }

  async getAllImgByUserId(userId: number): Promise<TGetAllImgByUserId> {
    return await this._repo.getAllImgByUserId(userId);
  }

  async getAllUserPosts(dto: IGetAllUserPostsDto): Promise<IGetAllUserPostsResponse> {
    return await this._repo.getAllUserPosts(dto);
  }

  async delete(id: number): Promise<IDeleteResponse> {
    const isExist = await this._repo.checkById(id);
    if (!isExist) {
      throw new ServiceException('Not found');
    }
    const deletedPost = await this._repo.delete(id);
    await this._filesService.delete(deletedPost.img, 'post');
    return { result: 'ok' };
  }

  async countByStatus(userId: number): Promise<TCountByStatusResponse> {
    const raw = await this._repo.countByStatus(userId);

    const res = {} as TCountByStatusResponse;
    for (const el of raw) {
      res[el.status] = el._count.status;
    }
    return res;
  }
}
