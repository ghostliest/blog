import { IPostRepository } from './post.repository';
import { IFilesService } from '../files/files.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ServiceException } from 'src/exceptions/service.exception';
import { IGetAllPostQueryDto } from './dto/get-all-post-query.dto';
import { IGetAllUserPostsDto } from './dto/get-all-user-posts.dto';
import { IGetPostsByAuthorDto } from './dto/getPostsByAuthor.dto';

export interface IPostService {
  create(file: Express.Multer.File, dto: CreatePostDto): Promise<any>;
  update(file: Express.Multer.File, postId: number, dto: CreatePostDto): Promise<any>;
  getOne(id: number, userId?: number): Promise<any>;
  getPostsByAuthor(dto: IGetPostsByAuthorDto): Promise<any>;
  getAll(dto: IGetAllPostQueryDto): Promise<any>;
  getAllImgByUserId(userId: number): Promise<{ img: string }[]>;
  getAllUserPosts(dto: IGetAllUserPostsDto): Promise<any[]>;
  delete(postId: number): Promise<{ result: string }>;
  countByStatus(userId: number): Promise<any>;
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

  async update(file: Express.Multer.File, postId: number, dto: CreatePostDto): Promise<any> {
    const post = await this._repo.getOne(postId);

    if (post.user.id === dto.userId) {
      let fileName;
      if (post.img !== file.originalname) {
        await this._filesService.delete(post.img, 'post');
        fileName = await this._filesService.create(file, 'post');
      }
      const img = fileName || post.img;
      return this._repo.update(postId, { ...dto, img });
    } else {
      throw new ServiceException('Error');
    }
  }

  async getOne(id: number, userId: number = null): Promise<any> {
    const post = await this._repo.getOne(id);
    if (post?.id && (post.user.id === userId || post.status === 'ACTIVE')) {
      return post;
    }
    throw new ServiceException('Not found');
  }

  async getPostsByAuthor(dto: IGetPostsByAuthorDto) {
    return await this._repo.getPostsByAuthor(dto);
  }

  async getAll(dto: IGetAllPostQueryDto): Promise<any> {
    const posts = await this._repo.getAll(dto);
    return posts;
  }

  async getAllImgByUserId(userId: number): Promise<{ img: string }[]> {
    return await this._repo.getAllImgByUserId(userId);
  }

  async getAllUserPosts(dto: IGetAllUserPostsDto): Promise<any[]> {
    return await this._repo.getAllUserPosts(dto);
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

  async countByStatus(userId: number): Promise<any> {
    const obj = await this._repo.countByStatus(userId);
    const res = {};
    for (const el of obj) {
      res[el.status] = el._count.status;
    }
    return res;
  }
}
