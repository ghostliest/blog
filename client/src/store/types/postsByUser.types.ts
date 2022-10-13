import { IGetAllPostsQuery, IPost, IUserReaction } from "@services";

export interface PostsByUserInitialInterface {
  posts: {
    posts: IPost[] | null;
    count: number;
  };
  author: IUserReaction | null;
  query: IGetAllPostsQuery;
}

export enum PostsByUserActionTypesEnum {
  SET_AUTHOR_POSTS_POSTS = "SET_AUTHOR_POSTS_POSTS",
  SET_AUTHOR_POSTS_COUNT = "SET_AUTHOR_POSTS_COUNT",
  SET_AUTHOR_POSTS_QUERY = "SET_AUTHOR_POSTS_QUERY",
  SET_AUTHOR_POSTS_AUTHOR = "SET_AUTHOR_POSTS_AUTHOR",
}

export interface PostsByAuthorActionInterface {
  type: PostsByUserActionTypesEnum.SET_AUTHOR_POSTS_POSTS;
  payload: IPost[] | null;
}

export interface CountPostsByAuthorActionInterface {
  type: PostsByUserActionTypesEnum.SET_AUTHOR_POSTS_COUNT;
  payload: number;
}

export interface QueryPostsByAuthorActionInterface {
  type: PostsByUserActionTypesEnum.SET_AUTHOR_POSTS_QUERY;
  payload: IGetAllPostsQuery;
}

export interface UserPostsByAuthorActionInterface {
  type: PostsByUserActionTypesEnum.SET_AUTHOR_POSTS_AUTHOR;
  payload: IUserReaction | null;
}

export type PostsByUserActions =
  | PostsByAuthorActionInterface
  | CountPostsByAuthorActionInterface
  | QueryPostsByAuthorActionInterface
  | UserPostsByAuthorActionInterface;
