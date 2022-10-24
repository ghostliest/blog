import { Post, PostStatus } from '@prisma/client';
import { ICreatePostDto } from '../dto/create-post.dto';
import { IGetAllPostQueryDto } from '../dto/get-all-post-query.dto';
import { IGetAllUserPostsDto } from '../dto/get-all-user-posts.dto';
import { IGetPostsByAuthorDto } from '../dto/getPostsByAuthor.dto';
import {
  IGetAllResponse,
  IGetAllUserPostsResponse,
  IGetByAuthorResponse,
  IGetOneResponse,
  TGetAllImgByUserId,
} from './repository.types';

export interface IPostService {
  create(params: ICreate): Promise<Post>;
  update(params: IUpdate): Promise<Post>;
  getOne(params: IGetOne): Promise<IGetOneResponse>;
  getByAuthor(dto: IGetPostsByAuthorDto): Promise<IGetByAuthorResponse>;
  getAll(dto: IGetAllPostQueryDto): Promise<IGetAllResponse>;
  getAllImgByUserId(userId: number): Promise<TGetAllImgByUserId>;
  getAllUserPosts(dto: IGetAllUserPostsDto): Promise<IGetAllUserPostsResponse>;
  delete(postId: number): Promise<IDeleteResponse>;
  countByStatus(userId: number): Promise<TCountByStatusResponse>;
}

export interface ICreate {
  file: Express.Multer.File;
  dto: ICreatePostDto;
}

export interface IUpdate {
  id: number;
  file: Express.Multer.File;
  dto: ICreatePostDto;
}

export interface IGetOne {
  id: number;
  userId?: number;
}

export interface IDeleteResponse {
  result: 'ok';
}

export type TCountByStatusResponse = {
  [key in PostStatus]: number;
};
