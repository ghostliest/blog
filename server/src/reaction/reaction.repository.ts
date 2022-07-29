import { FavoritePost, LikedPost } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

export interface IReactionRepository {
  addFavorite(postId: number, userId: number): Promise<FavoritePost>;
  addLike(postId: number, userId: number): Promise<LikedPost>;
  getFavorite(postId: number, userId: number): Promise<FavoritePost>;
  getLike(postId: number, userId: number): Promise<LikedPost>;
  deleteFavorite(id: number): Promise<boolean>;
  deleteLike(id: number): Promise<boolean>;
  count(postId: number): Promise<{ readingList: number; liked: number }>;
}

export class ReactionRepository implements IReactionRepository {
  constructor(private _db: PrismaService) {}

  async addFavorite(postId: number, userId: number): Promise<FavoritePost> {
    const favorite = await this._db.favoritePost.create({
      data: {
        post: { connect: { id: postId } },
        user: { connect: { id: userId } },
      },
    });
    return favorite;
  }

  async addLike(postId: number, userId: number): Promise<LikedPost> {
    const like = await this._db.likedPost.create({
      data: {
        post: { connect: { id: postId } },
        user: { connect: { id: userId } },
      },
    });
    return like;
  }

  async getFavorite(postId: number, userId: number): Promise<FavoritePost> {
    return await this._db.favoritePost.findFirst({ where: { userId, postId } });
  }

  async getLike(postId: number, userId: number): Promise<LikedPost> {
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

  async count(postId: number): Promise<{ readingList: number; liked: number }> {
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
}
