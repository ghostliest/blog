import { Post } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { ICreatePostDto } from './dto/create-post.dto';
import { IGetAllPostQueryDto } from './dto/get-all-post-query.dto';
import { IGetAllUserPostsDto } from './dto/get-all-user-posts.dto';
import { IGetPostsByAuthorDto } from './dto/getPostsByAuthor.dto';
import {
  IPostRepository,
  IGetOneResponse,
  IGetByAuthorResponse,
  IGetAllResponse,
  TGetAllImgByUserId,
  IGetAllUserPostsResponse,
  IDeleteResponse,
  TCountByStatusResponse,
} from './types/repository.types';

export class PostRepository implements IPostRepository {
  constructor(private _db: PrismaService) {}

  async create(dto: ICreatePostDto): Promise<Post> {
    return await this._db.post.create({
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
  }

  async update(id: number, dto: ICreatePostDto): Promise<Post> {
    return await this._db.post.update({
      data: {
        title: dto.title,
        content: dto.content,
        description: dto.description,
        img: dto.img,
        status: dto.status,
        category: { connect: { id: dto.categoryId } },
        PostTag: {
          deleteMany: {
            postId: id,
          },
          createMany: {
            data: dto.tags.map((tagId) => ({ tagId })),
          },
        },
      },
      where: { id },
    });
  }

  async getOne(id: number): Promise<IGetOneResponse | null> {
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

  async getByAuthor(dto: IGetPostsByAuthorDto): Promise<IGetByAuthorResponse> {
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

  async getAll(dto: IGetAllPostQueryDto): Promise<IGetAllResponse> {
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

  async getAllImgByUserId(userId: number): Promise<TGetAllImgByUserId> {
    return await this._db.post.findMany({
      where: { userId },
      select: { img: true },
    });
  }

  async getAllUserPosts(dto: IGetAllUserPostsDto): Promise<IGetAllUserPostsResponse> {
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

  async delete(id: number): Promise<IDeleteResponse> {
    return await this._db.post.delete({
      where: { id },
      select: { id: true, img: true },
    });
  }

  async countByStatus(userId: number): Promise<TCountByStatusResponse> {
    return (await this._db.post.groupBy({
      by: ['status'],
      where: { userId },
      _count: {
        status: true,
      },
    })) as unknown as TCountByStatusResponse;
  }
}
