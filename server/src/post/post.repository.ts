import { Post } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { ICreatePostDto } from './dto/create-post.dto';
import { IGetAllPostQueryDto } from './dto/get-all-post-query.dto';

interface IGetOne {
  category: {
    id: number;
    value: string;
  };
  createAt: Date;
  user: {
    id: number;
    firstname: string;
    lastname: string;
  };
  id: number;
  PostTag: {
    tag: {
      value: string;
    };
  }[];
  img: string;
  views: number;
  title: string;
  description: string;
  content: string;
  updatedAt: Date;
}

export interface IPostRepository {
  create(dto: ICreatePostDto): Promise<Post>;
  getOne(id: number): Promise<IGetOne | null>;
  getAll(dto: IGetAllPostQueryDto): Promise<any>;
  getAllImgByUserId(userId: number): Promise<{ img: string }[]>;
  checkByTitle(title: string): Promise<boolean>;
  checkById(id: number): Promise<boolean>;
  update(): Promise<any>;
  delete(id: number): Promise<{ id: number; img: string }>;
}

export class PostRepository implements IPostRepository {
  constructor(private _db: PrismaService) {}

  async create(dto: ICreatePostDto): Promise<Post> {
    const result = await this._db.post.create({
      data: {
        title: dto.title,
        content: dto.content,
        description: dto.description,
        img: dto.img,
        status: dto.status,
        user: { connect: { id: dto.userId } },
        category: { connect: { id: dto.categoryId } },
        PostTag: {
          createMany: {
            data: dto.tags.map((tagId) => ({ tagId })),
          },
        },
      },
    });
    return result;
  }

  async getOne(id: number): Promise<IGetOne | null> {
    const post = await this._db.post.findFirst({
      where: { id, status: 'ACTIVE' },
      select: {
        id: true,
        title: true,
        description: true,
        content: true,
        img: true,
        views: true,
        createAt: true,
        updatedAt: true,
        PostTag: { select: { tag: { select: { value: true } } } },
        user: { select: { firstname: true, lastname: true, id: true } },
        category: { select: { id: true, value: true } },
      },
    });

    return post?.id ? post : null;
  }

  async getAll(dto: IGetAllPostQueryDto): Promise<any> {
    return await this._db.post.findMany({
      skip: dto.page * dto.limit - dto.limit,
      take: dto.limit,
      where: {
        categoryId: dto.categoryId,
        status: 'ACTIVE',
        AND: dto.tags?.map((id) => ({ PostTag: { some: { tagId: id } } })),
      },
      select: {
        id: true,
        title: true,
        description: true,
        img: true,
        views: true,
        createAt: true,
        PostTag: { select: { tag: { select: { id: true, value: true } } } },
        user: { select: { firstname: true, lastname: true, id: true } },
        category: { select: { id: true, value: true } },
      },
      orderBy: { views: 'desc' },
    });
  }

  async getAllImgByUserId(userId: number): Promise<{ img: string }[]> {
    return await this._db.post.findMany({
      where: { userId },
      select: { img: true },
    });
  }

  async checkByTitle(title: string): Promise<boolean> {
    const post = await this._db.post.findFirst({
      where: { title },
      select: { title: true },
    });
    return !!post?.title;
  }

  async checkById(id: number): Promise<boolean> {
    const post = await this._db.post.findUnique({
      where: { id },
      select: { id: true },
    });
    return !!post?.id;
  }

  async update(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async delete(id: number): Promise<{ id: number; img: string }> {
    const post = await this._db.post.delete({
      where: { id },
      select: { id: true, img: true },
    });
    return post;
  }
}
