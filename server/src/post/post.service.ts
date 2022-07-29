import { IPostRepository } from './post.repository';
import { IFilesService } from '../files/files.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ServiceException } from 'src/exceptions/service.exception';
import { IGetAllPostQueryDto } from './dto/get-all-post-query.dto';

export interface IPostService {
  create(file: Express.Multer.File, dto: CreatePostDto, userId: number): Promise<any>;
  getOne(id: number): Promise<any>;
  getAll(dto: IGetAllPostQueryDto): Promise<any>;
  getAllImgByUserId(userId: number): Promise<{ img: string }[]>;
  delete(postId: number): Promise<{ result: string }>;
}

export class PostService implements IPostService {
  constructor(
    private readonly _repo: IPostRepository,
    private readonly _filesService: IFilesService,
  ) {}

  async create(file: Express.Multer.File, dto: CreatePostDto): Promise<any> {
    const isExists = await this._repo.checkByTitle(dto.title);
    if (isExists) {
      throw new ServiceException('Post with this title already exists');
    } else {
      const fileName = await this._filesService.create(file, 'post');
      return await this._repo.create({ ...dto, img: fileName });
    }
  }

  async getOne(id: number): Promise<any> {
    const post = await this._repo.getOne(id);
    if (post?.id) {
      return post;
    } else {
      throw new ServiceException('Not found');
    }
  }

  async getAll(dto: IGetAllPostQueryDto): Promise<any> {
    const posts = await this._repo.getAll(dto);
    return posts;
  }

  async getAllImgByUserId(userId: number): Promise<{ img: string }[]> {
    return await this._repo.getAllImgByUserId(userId);
  }

  async delete(id: number): Promise<{ result: string }> {
    const isExists = await this._repo.checkById(id);
    if (!isExists) {
      throw new ServiceException('Not found');
    }
    const deletedPost = await this._repo.delete(id);
    await this._filesService.delete(deletedPost.img, 'post');
    return { result: 'ok' };
  }
}
