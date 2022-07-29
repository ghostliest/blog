import { IReactionRepository } from './reaction.repository';
import { IAddReactionDto } from './dto/add-reaction.dto';
import { IGetReactionDto } from './dto/get-reaction.dto';

export interface IReactionAddResponse {
  category: 'readinglist' | 'like';
  result: 'create' | 'destroy' | 'true' | 'false';
}

export interface IReactionService {
  addOrDelete(dto: IAddReactionDto): Promise<IReactionAddResponse>;
  get(dto: IGetReactionDto): Promise<any>;
  check(dto: IAddReactionDto, userId: number): Promise<IReactionAddResponse>;
  count(dto: { postId: number }): Promise<any>;
}

export class ReactionService implements IReactionService {
  constructor(private readonly _repo: IReactionRepository) {}

  async addOrDelete(dto: IAddReactionDto): Promise<IReactionAddResponse> {
    if (dto.category === 'like') {
      const like = await this._repo.getLike(dto.postId, dto.userId);
      if (like?.id) {
        await this._repo.deleteLike(like.id);
        return { category: dto.category, result: 'destroy' };
      } else {
        await this._repo.addLike(dto.postId, dto.userId);
        return { category: dto.category, result: 'create' };
      }
    } else if (dto.category === 'readinglist') {
      const favorite = await this._repo.getFavorite(dto.postId, dto.userId);
      if (favorite?.id) {
        await this._repo.deleteFavorite(favorite.id);
        return { category: dto.category, result: 'destroy' };
      } else {
        await this._repo.addFavorite(dto.postId, dto.userId);
        return { category: dto.category, result: 'create' };
      }
    }
  }

  async get(dto: IGetReactionDto): Promise<any> {
    const count = await this._repo.count(dto.postId);
    const userReadingList = await this._repo.getFavorite(dto.postId, dto.userId);
    const userlike = await this._repo.getLike(dto.postId, dto.userId);
    return {
      readingList: {
        count: count.readingList,
        thisUser: !!userReadingList?.id,
      },
      like: {
        count: count.liked,
        thisUser: !!userlike?.id,
      },
    };
  }

  async check(dto: IAddReactionDto, userId: number): Promise<IReactionAddResponse> {
    if (dto.category === 'like') {
      const like = await this._repo.getLike(dto.postId, userId);
      if (like?.id) {
        return { category: dto.category, result: 'true' };
      } else {
        return { category: dto.category, result: 'false' };
      }
    } else if (dto.category === 'readinglist') {
      const favorite = await this._repo.getFavorite(dto.postId, userId);
      if (favorite?.id) {
        return { category: dto.category, result: 'true' };
      } else {
        return { category: dto.category, result: 'false' };
      }
    }
  }

  async count(dto: { postId: number }): Promise<any> {
    return this._repo.count(dto.postId);
  }
}
