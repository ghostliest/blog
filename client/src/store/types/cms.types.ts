import { PostStatusType } from "@services";

export interface CmsInitialInterface {
  posts: PostsInterface;
  create: CreateInterface;
}

export interface CreateInterface {
  post: {
    errorMessage: string;
    showSuccessNotification: boolean;
  };
}

export interface PostsInterface {
  deletePost: {
    postId: number | null;
    delete: boolean;
  };
  query: PostsQueryInterface;
  count: number;
}

export interface PostsQueryInterface {
  page: number;
  limit: number;
  status: PostNavigationType;
}

export type PostNavigationType = PostStatusType | "ALL";

export enum CmsActionTypesEnum {
  SET_DELETE_POST = "SET_DELETE_POST",
  SET_DELETE_POST_ID = "SET_DELETE_POST_ID",
  SET_POSTS_QUERY = "SET_POSTS_QUERY",
  SET_POSTS_QUERY_PAGE = "SET_POSTS_QUERY_PAGE",
  SET_POSTS_QUERY_STATUS = "SET_POSTS_QUERY_STATUS",
  SET_POSTS_COUNT = "SET_POSTS_COUNT",
  SET_ERROR_MES_ON_POST_CREATE = "SET_ERROR_MES_ON_POST_CREATE",
  SET_SHOW_SUCCESS_POST_CREATE_NOTIFICATION = "SET_SHOW_SUCCESS_POST_CREATE_NOTIFICATION",
}

export interface DeletePostActionInterface {
  type: CmsActionTypesEnum.SET_DELETE_POST;
  payload: boolean;
}

export interface DeletePostIdActionInterface {
  type: CmsActionTypesEnum.SET_DELETE_POST_ID;
  payload: number | null;
}

export interface PostsQueryActionInterface {
  type: CmsActionTypesEnum.SET_POSTS_QUERY;
  payload: PostsQueryInterface;
}

export interface PostsQueryPageActionInterface {
  type: CmsActionTypesEnum.SET_POSTS_QUERY_PAGE;
  payload: number;
}

export interface PostsQueryStatusActionInterface {
  type: CmsActionTypesEnum.SET_POSTS_QUERY_STATUS;
  payload: PostNavigationType;
}

export interface PostsCountActionInterface {
  type: CmsActionTypesEnum.SET_POSTS_COUNT;
  payload: number;
}

export interface ErrorMesOnPostCreateInterface {
  type: CmsActionTypesEnum.SET_ERROR_MES_ON_POST_CREATE;
  payload: string;
}

export interface ShowCreatePostNotificationInterface {
  type: CmsActionTypesEnum.SET_SHOW_SUCCESS_POST_CREATE_NOTIFICATION;
  payload: boolean;
}

export type CmsActions =
  | DeletePostActionInterface
  | DeletePostIdActionInterface
  | PostsQueryActionInterface
  | PostsQueryPageActionInterface
  | PostsQueryStatusActionInterface
  | PostsCountActionInterface
  | ErrorMesOnPostCreateInterface
  | ShowCreatePostNotificationInterface;
