export type AuthorsStatisticType = "day" | "week" | "month";

export interface IAuthorsStatisticQuery {
  sort: AuthorsStatisticType;
}

export interface IGetAuthorsStatisticResponse {
  user: {
    id: number;
    firstname: string;
    lastname: string;
  };
  views: number;
  posts: number;
  likes: number;
  favorites: number;
  followers: number;
}

export interface IAuthorStatisticQuery {
  authorId: number;
}

export interface IGetAuthorStatisticResponse {
  posts: number;
  views: number;
  favorites: number;
  likes: number;
}
