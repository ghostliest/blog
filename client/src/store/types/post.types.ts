import { IGetOnePostResponse, IGetAuthorPostsResponse } from "@services";

export interface PostInitialInterface {
  post: IGetOnePostResponse | null;
  authorPosts: IGetAuthorPostsResponse | null;
}

export enum PostActionTypesEnum {
  SET_POST = "SET_POST",
  SET_AUTHOR_POSTS = "SET_OTHER_POST",
}

export interface PostActionInterface {
  type: PostActionTypesEnum.SET_POST;
  payload: IGetOnePostResponse;
}

export interface AuthorPostsActionInterface {
  type: PostActionTypesEnum.SET_AUTHOR_POSTS;
  payload: IGetAuthorPostsResponse;
}

export type PostActions = PostActionInterface | AuthorPostsActionInterface;
