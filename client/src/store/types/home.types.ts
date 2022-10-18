import { IGetAllPostsResponse } from "@services";

export interface HomePageInitialInterface {
  posts: IGetAllPostsResponse | null;
}

export enum PostsActionTypesEnum {
  SET_HOME_POSTS = "SET_HOME_POSTS",
}

export interface PostsActionInterface {
  type: PostsActionTypesEnum.SET_HOME_POSTS;
  payload: IGetAllPostsResponse;
}

export type HomeActions = PostsActionInterface;
