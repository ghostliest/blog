import { Post, PostStatus } from '@prisma/client';
import { ICreatePostDto } from '../dto/create-post.dto';
import { IGetAllPostQueryDto } from '../dto/get-all-post-query.dto';
import { IGetAllUserPostsDto } from '../dto/get-all-user-posts.dto';
import { IGetPostsByAuthorDto } from '../dto/getPostsByAuthor.dto';

export interface IPostRepository {
  create(dto: ICreatePostDto): Promise<Post>;
  update(id: number, dto: ICreatePostDto): Promise<Post>;
  getOne(id: number): Promise<IGetOneResponse | null>;
  getByAuthor(dto: IGetPostsByAuthorDto): Promise<IGetByAuthorResponse>;
  getAll(dto: IGetAllPostQueryDto): Promise<IGetAllResponse>;
  getAllImgByUserId(userId: number): Promise<TGetAllImgByUserId>;
  getAllUserPosts(dto: IGetAllUserPostsDto): Promise<IGetAllUserPostsResponse>;
  checkByTitle(title: string): Promise<boolean>;
  checkById(id: number): Promise<boolean>;
  delete(id: number): Promise<IDeleteResponse>;
  countByStatus(userId: number): Promise<TCountByStatusResponse>;
}

export interface IGetOneResponse {
  id: number;
  status: 'DRAFT' | 'ACTIVE' | 'BLOCKED';
  img: string;
  views: number;
  title: string;
  description: string;
  content: string;
  user: {
    id: number;
    firstname: string;
    lastname: string;
  };
  category: ITagOrCategory;
  PostTag: {
    tag: ITagOrCategory;
  }[];
  updatedAt: Date;
  createAt: Date;
}

export interface IGetByAuthorResponse {
  count: number;
  posts: {
    id: number;
    img: string;
    views: number;
    title: string;
    createAt: Date;
    category: ITagOrCategory;
    PostTag: {
      tag: ITagOrCategory;
    }[];
  }[];
}

export interface IGetAllResponse {
  count: number;
  posts: {
    id: number;
    title: string;
    description: string;
    img: string;
    views: number;
    createAt: Date;
    user: {
      id: number;
      firstname: string;
      lastname: string;
    };
    category: ITagOrCategory;
    PostTag: {
      tag: ITagOrCategory;
    }[];
  }[];
}

export type TGetAllImgByUserId = { img: string }[];

export interface IGetAllUserPostsResponse {
  count: number;
  posts: {
    id: number;
    title: string;
    status: PostStatus;
    createAt: Date;
    updatedAt: Date;
    category: ITagOrCategory;
    PostTag: {
      tag: ITagOrCategory;
    }[];
  }[];
}

export interface IDeleteResponse {
  id: number;
  img: string;
}

export type TCountByStatusResponse = {
  _count: { status: number };
  status: PostStatus;
}[];

interface ITagOrCategory {
  id: number;
  value: string;
}
