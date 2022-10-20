import { Post } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { ICreatePostDto } from './dto/create-post.dto';
import { IGetAllPostQueryDto } from './dto/get-all-post-query.dto';
import { IGetAllUserPostsDto } from './dto/get-all-user-posts.dto';
import { IGetPostsByAuthorDto } from './dto/getPostsByAuthor.dto';

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
  status: 'DRAFT' | 'ACTIVE' | 'BLOCKED';
  img: string;
  views: number;
  title: string;
  description: string;
  content: string;
  updatedAt: Date;
}

export interface IPostRepository {
  create(dto: ICreatePostDto): Promise<Post>;
  update(postId: number, dto: ICreatePostDto): Promise<Post>;
  getOne(id: number): Promise<IGetOne | null>;
  getPostsByAuthor(dto: IGetPostsByAuthorDto): Promise<any>;
  getAll(dto: IGetAllPostQueryDto): Promise<any>;
  getAllImgByUserId(userId: number): Promise<{ img: string }[]>;
  getAllUserPosts(dto: IGetAllUserPostsDto): Promise<any>;
  checkByTitle(title: string): Promise<boolean>;
  checkById(id: number): Promise<boolean>;
  delete(id: number): Promise<{ id: number; img: string }>;
  countByStatus(userId: number): Promise<{ _count: { status: number }; status: string }[]>;
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

  async update(postId: number, dto: ICreatePostDto): Promise<Post> {
    const res = await this._db.post.update({
      data: {
        title: dto.title,
        content: dto.content,
        description: dto.description,
        img: dto.img,
        status: dto.status,
        category: { connect: { id: dto.categoryId } },
        PostTag: {
          deleteMany: {
            postId: postId,
          },
          createMany: {
            data: dto.tags.map((tagId) => ({ tagId })),
          },
        },
      },
      where: { id: postId },
    });

    return res;
  }

  async getOne(id: number): Promise<IGetOne | null> {
    const post = await this._db.post.findFirst({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        content: true,
        img: true,
        status: true,
        views: true,
        createAt: true,
        updatedAt: true,
        PostTag: { select: { tag: { select: { id: true, value: true } } } },
        user: { select: { firstname: true, lastname: true, id: true } },
        category: { select: { id: true, value: true } },
      },
    });

    return post?.id ? post : null;
  }

  async getPostsByAuthor(dto: IGetPostsByAuthorDto): Promise<any> {
    const posts = await this._db.post.findMany({
      skip: dto.page * dto.limit - dto.limit,
      take: dto.limit,
      where: {
        userId: dto.authorId,
        status: 'ACTIVE',
      },
      select: {
        id: true,
        title: true,
        img: true,
        views: true,
        createAt: true,
        PostTag: { select: { tag: { select: { id: true, value: true } } } },
        category: { select: { id: true, value: true } },
      },
      orderBy: {
        views: 'desc',
      },
    });

    const count = await this._db.post.count({
      where: {
        userId: dto.authorId,
        status: 'ACTIVE',
      },
    });

    return { count, posts };
  }

  async getAll(dto: IGetAllPostQueryDto): Promise<any> {
    const { page, limit, categoryId, authorId, tags, sort, orderBy } = dto;

    const handleOrderBy = () => {
      if (sort === 'views') {
        return { views: orderBy };
      } else if (sort === 'date') {
        return { createAt: orderBy };
      } else if (sort === 'popular') {
        return { LikedPost: { _count: orderBy } };
      }
    };

    const posts = await this._db.post.findMany({
      skip: page * limit - limit,
      take: limit,
      where: {
        userId: authorId,
        categoryId: categoryId,
        status: 'ACTIVE',
        AND: tags?.map((id) => ({ PostTag: { some: { tagId: id } } })),
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
      orderBy: { ...handleOrderBy() },
    });

    const count = await this._db.post.count({
      where: {
        userId: authorId,
        categoryId: categoryId,
        status: 'ACTIVE',
        AND: tags?.map((id) => ({ PostTag: { some: { tagId: id } } })),
      },
    });

    return { count, posts };
  }

  async getAllImgByUserId(userId: number): Promise<{ img: string }[]> {
    return await this._db.post.findMany({
      where: { userId },
      select: { img: true },
    });
  }

  async getAllUserPosts(dto: IGetAllUserPostsDto): Promise<any> {
    const posts = await this._db.post.findMany({
      skip: dto.page * dto.limit - dto.limit,
      take: dto.limit,
      where: {
        userId: dto.userId,
        status: dto.status,
      },
      select: {
        id: true,
        title: true,
        createAt: true,
        updatedAt: true,
        status: true,
        category: {
          select: {
            id: true,
            value: true,
          },
        },
        PostTag: {
          select: {
            tag: {
              select: {
                id: true,
                value: true,
              },
            },
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    const count = await this._db.post.count({
      where: { userId: dto.userId, status: dto.status },
    });

    return { count, posts };
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

  async delete(id: number): Promise<{ id: number; img: string }> {
    const post = await this._db.post.delete({
      where: { id },
      select: { id: true, img: true },
    });
    return post;
  }

  async countByStatus(userId: number): Promise<{ _count: { status: number }; status: string }[]> {
    return (await this._db.post.groupBy({
      by: ['status'],
      where: { userId },
      _count: {
        status: true,
      },
    })) as any;
  }
}
