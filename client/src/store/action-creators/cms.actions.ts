import { IUserPostsResponse } from "@services";
import {
  CmsActionTypesEnum,
  PostsQueryActionInterface,
  DeletePostIdActionInterface,
  ErrorMesOnPostCreateInterface,
  ShowCreatePostNotificationInterface,
  DeletePostActionInterface,
  PostsQueryInterface,
  PostsQueryStatusActionInterface,
  PostNavigationType,
  PostsQueryPageActionInterface,
  LayoutCmsWidthInterface,
  LayoutCmsWidth,
  PostsWidthActionInterface,
  CmsPostsActionInterface,
} from "../types/cms.types";

export const setDeletePostId = (payload: number | null): DeletePostIdActionInterface => {
  return {
    type: CmsActionTypesEnum.SET_DELETE_POST_ID,
    payload,
  };
};

export const setDeletePost = (payload: boolean): DeletePostActionInterface => {
  return {
    type: CmsActionTypesEnum.SET_DELETE_POST,
    payload,
  };
};

export const setCmsPosts = (payload: IUserPostsResponse | null): CmsPostsActionInterface => {
  return {
    type: CmsActionTypesEnum.SET_CMS_POSTS,
    payload,
  };
};

export const setPostsQuery = (payload: PostsQueryInterface): PostsQueryActionInterface => {
  return {
    type: CmsActionTypesEnum.SET_POSTS_QUERY,
    payload,
  };
};

export const setPostsQueryPage = (payload: number): PostsQueryPageActionInterface => {
  return {
    type: CmsActionTypesEnum.SET_POSTS_QUERY_PAGE,
    payload,
  };
};

export const setPostsQueryStatus = (payload: PostNavigationType): PostsQueryStatusActionInterface => {
  return {
    type: CmsActionTypesEnum.SET_POSTS_QUERY_STATUS,
    payload,
  };
};

export const setPostsWidth = (payload: LayoutCmsWidth): PostsWidthActionInterface => {
  return {
    type: CmsActionTypesEnum.SET_POSTS_WIDTH,
    payload,
  };
};

export const setPostCreateErrorMes = (payload: string): ErrorMesOnPostCreateInterface => {
  return {
    type: CmsActionTypesEnum.SET_ERROR_MES_ON_POST_CREATE,
    payload,
  };
};

export const setPostOnCreateNotification = (payload: boolean): ShowCreatePostNotificationInterface => {
  return {
    type: CmsActionTypesEnum.SET_SHOW_SUCCESS_POST_CREATE_NOTIFICATION,
    payload,
  };
};

export const setLayoutCmsWidth = (payload: LayoutCmsWidth): LayoutCmsWidthInterface => {
  return {
    type: CmsActionTypesEnum.SET_CMS_LAYOUT_WIDTH,
    payload,
  };
};
