import { FavoritePost, LikedPost } from '@prisma/client';

export interface IReactionRepository {
  addFavorite(params: TAddFavorite): Promise<TAddFavoriteResponse>;
  addLike(params: TAddLike): Promise<TAddLikeResponse>;
  getFavorite(params: TGetFavorite): Promise<TGetFavoriteResponse>;
  getLike(params: TGetLike): Promise<TGetLikeResponse>;
  deleteFavorite(id: number): Promise<boolean>;
  deleteLike(id: number): Promise<boolean>;
  count(postId: number): Promise<ICountResponse>;
  getLikedActivity(dto: IActivityDto): Promise<IActivityReactionResponse[]>;
  getFavoritesActivity(dto: IActivityDto): Promise<IActivityReactionResponse[]>;
}

export type TAddFavorite = {
  postId: number;
  userId: number;
};

export type TAddLike = TAddFavorite;
export type TGetFavorite = TAddFavorite;
export type TGetLike = TAddFavorite;

export type TAddFavoriteResponse = FavoritePost;
export type TGetFavoriteResponse = FavoritePost;
export type TAddLikeResponse = LikedPost;
export type TGetLikeResponse = LikedPost;

export interface ICountResponse {
  readingList: number;
  liked: number;
}

export interface IActivityReactionResponse {
  createAt: Date;
  user: {
    id: number;
    firstname: string;
    lastname: string;
  };
  post: {
    id: number;
    title: string;
  };
}

export type TActivityReaction = Omit<IActivityReactionResponse, 'createAt'>;

export interface IActivityDto {
  page: number;
  limit: number;
}

export interface IActivityResponse {
  liked: IActivityReactionResponse[];
  favorites: IActivityReactionResponse[];
}
