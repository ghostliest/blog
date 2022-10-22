import { IAddReactionDto } from './dto/add-reaction.dto';
import { IGetReactionDto } from './dto/get-reaction.dto';
import { IActivityDto, IActivityResponse, IReactionRepository } from './types/repository.types';
import { TReactionAddResponse, IReactionService, IGetResponse } from './types/service.types';

export class ReactionService implements IReactionService {
  constructor(private readonly _repo: IReactionRepository) {}

  async addOrDelete(dto: IAddReactionDto): Promise<TReactionAddResponse> {
    const { postId, userId, category } = dto;

    if (category === 'like') {
      const like = await this._repo.getLike({ postId, userId });
      if (like?.id) {
        await this._repo.deleteLike(like.id);
        return { category, result: 'destroy' };
      } else {
        await this._repo.addLike({ postId, userId });
        return { category, result: 'create' };
      }
    } else if (category === 'readingList') {
      const favorite = await this._repo.getFavorite({ postId, userId });
      if (favorite?.id) {
        await this._repo.deleteFavorite(favorite.id);
        return { category, result: 'destroy' };
      } else {
        await this._repo.addFavorite({ postId, userId });
        return { category, result: 'create' };
      }
    }
  }

  async get({ postId, userId }: IGetReactionDto): Promise<IGetResponse> {
    const count = await this._repo.count(postId);

    const userReactions = {
      readingList: null,
      like: null,
    };

    if (userId) {
      userReactions.readingList = await this._repo.getFavorite({ postId, userId });
      userReactions.like = await this._repo.getLike({ postId, userId });
    }

    return {
      readingList: {
        count: count.readingList,
        thisUser: !!userReactions.readingList?.id,
      },
      like: {
        count: count.liked,
        thisUser: !!userReactions.like?.id,
      },
    };
  }

  async getLastActivity(dto: IActivityDto): Promise<IActivityResponse> {
    const liked = await this._repo.getLikedActivity(dto);
    const favorites = await this._repo.getFavoritesActivity(dto);

    return {
      liked,
      favorites,
    };
  }
}
