import { PrismaService } from 'src/database/prisma.service';
import {
  IActivityDto,
  IActivityReactionResponse,
  ICountResponse,
  IReactionRepository,
  TAddFavorite,
  TAddFavoriteResponse,
  TAddLike,
  TAddLikeResponse,
  TGetFavorite,
  TGetFavoriteResponse,
  TGetLike,
  TGetLikeResponse,
} from './types/repository.types';

export class ReactionRepository implements IReactionRepository {
  constructor(private _db: PrismaService) {}

  async addFavorite({ postId, userId }: TAddFavorite): Promise<TAddFavoriteResponse> {
    return await this._db.favoritePost.create({
      data: {
        post: { connect: { id: postId } },
        user: { connect: { id: userId } },
      },
    });
  }

  async addLike({ postId, userId }: TAddLike): Promise<TAddLikeResponse> {
    return await this._db.likedPost.create({
      data: {
        post: { connect: { id: postId } },
        user: { connect: { id: userId } },
      },
    });
  }

  async getFavorite({ postId, userId }: TGetFavorite): Promise<TGetFavoriteResponse> {
    return await this._db.favoritePost.findFirst({ where: { userId, postId } });
  }

  async getLike({ postId, userId }: TGetLike): Promise<TGetLikeResponse> {
    return await this._db.likedPost.findFirst({ where: { userId, postId } });
  }

  async deleteFavorite(id: number): Promise<boolean> {
    const favorite = await this._db.favoritePost.delete({ where: { id } });
    return !!favorite?.postId;
  }

  async deleteLike(id: number): Promise<boolean> {
    const like = await this._db.likedPost.delete({ where: { id } });
    return !!like?.postId;
  }

  async count(postId: number): Promise<ICountResponse> {
    const count = await this._db.post.findMany({
      where: { id: postId },
      select: {
        _count: {
          select: {
            FavoritePost: true,
            LikedPost: true,
          },
        },
      },
    });

    return {
      readingList: count[0]._count.FavoritePost,
      liked: count[0]._count.LikedPost,
    };
  }

  async getLikedActivity(dto: IActivityDto): Promise<IActivityReactionResponse[]> {
    const { page, limit } = dto;

    return await this._db.likedPost.findMany({
      skip: page * limit - limit,
      take: limit,
      select: {
        createAt: true,
        post: { select: { id: true, title: true } },
        user: { select: { id: true, firstname: true, lastname: true } },
      },
      orderBy: { createAt: 'desc' },
    });
  }

  async getFavoritesActivity(dto: IActivityDto): Promise<IActivityReactionResponse[]> {
    const { page, limit } = dto;

    return await this._db.favoritePost.findMany({
      skip: page * limit - limit,
      take: limit,
      select: {
        createAt: true,
        post: { select: { id: true, title: true } },
        user: { select: { id: true, firstname: true, lastname: true } },
      },
      orderBy: { createAt: 'desc' },
    });
  }
}
