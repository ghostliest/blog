import { IUserPostsResponse, PostStatusType } from "@services";

export interface CmsInitialInterface {
  posts: PostsInterface;
  create: CreateInterface;
  layout: LayoutInterface;
}

export interface LayoutInterface {
  width: LayoutCmsWidth;
}

export type LayoutCmsWidth = "s" | "m" | "l" | null;

export interface CreateInterface {
  post: {
    errorMessage: string;
    showSuccessNotification: boolean;
  };
}

export interface PostsInterface {
  posts: IUserPostsResponse | null;
  query: PostsQueryInterface;
  width: LayoutCmsWidth;
  deletePost: {
    postId: number | null;
    delete: boolean;
  };
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
  SET_CMS_POSTS = "SET_CMS_POSTS",
  SET_POSTS_QUERY = "SET_POSTS_QUERY",
  SET_POSTS_QUERY_PAGE = "SET_POSTS_QUERY_PAGE",
  SET_POSTS_QUERY_STATUS = "SET_POSTS_QUERY_STATUS",
  SET_POSTS_WIDTH = "SET_POSTS_WIDTH",
  SET_ERROR_MES_ON_POST_CREATE = "SET_ERROR_MES_ON_POST_CREATE",
  SET_SHOW_SUCCESS_POST_CREATE_NOTIFICATION = "SET_SHOW_SUCCESS_POST_CREATE_NOTIFICATION",
  SET_CMS_LAYOUT_WIDTH = "SET_CMS_LAYOUT_WIDTH",
}

export interface DeletePostActionInterface {
  type: CmsActionTypesEnum.SET_DELETE_POST;
  payload: boolean;
}

export interface DeletePostIdActionInterface {
  type: CmsActionTypesEnum.SET_DELETE_POST_ID;
  payload: number | null;
}

export interface CmsPostsActionInterface {
  type: CmsActionTypesEnum.SET_CMS_POSTS;
  payload: IUserPostsResponse | null;
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

export interface PostsWidthActionInterface {
  type: CmsActionTypesEnum.SET_POSTS_WIDTH;
  payload: LayoutCmsWidth;
}

export interface ErrorMesOnPostCreateInterface {
  type: CmsActionTypesEnum.SET_ERROR_MES_ON_POST_CREATE;
  payload: string;
}

export interface ShowCreatePostNotificationInterface {
  type: CmsActionTypesEnum.SET_SHOW_SUCCESS_POST_CREATE_NOTIFICATION;
  payload: boolean;
}

export interface LayoutCmsWidthInterface {
  type: CmsActionTypesEnum.SET_CMS_LAYOUT_WIDTH;
  payload: LayoutCmsWidth;
}

export type CmsActions =
  | CmsPostsActionInterface
  | DeletePostActionInterface
  | DeletePostIdActionInterface
  | PostsQueryActionInterface
  | PostsQueryPageActionInterface
  | PostsQueryStatusActionInterface
  | PostsWidthActionInterface
  | ErrorMesOnPostCreateInterface
  | ShowCreatePostNotificationInterface
  | LayoutCmsWidthInterface;
