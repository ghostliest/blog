import { IGetAllPostsQuery, IPostReaction, IUserReaction } from "@services";
import {
  CountPostsByAuthorActionInterface,
  PostsByAuthorActionInterface,
  PostsByUserActionTypesEnum,
  QueryPostsByAuthorActionInterface,
  UserPostsByAuthorActionInterface,
} from "@store/types/postsByUser.types";

export const setPostsByUser = (payload: IPostReaction[] | null): PostsByAuthorActionInterface => {
  return {
    type: PostsByUserActionTypesEnum.SET_AUTHOR_POSTS_POSTS,
    payload,
  };
};

export const setPostsByUserCount = (payload: number): CountPostsByAuthorActionInterface => {
  return {
    type: PostsByUserActionTypesEnum.SET_AUTHOR_POSTS_COUNT,
    payload,
  };
};

export const setPostsByUserQuery = (payload: IGetAllPostsQuery): QueryPostsByAuthorActionInterface => {
  return {
    type: PostsByUserActionTypesEnum.SET_AUTHOR_POSTS_QUERY,
    payload,
  };
};

export const setUserPostsByUser = (payload: IUserReaction | null): UserPostsByAuthorActionInterface => {
  return {
    type: PostsByUserActionTypesEnum.SET_AUTHOR_POSTS_AUTHOR,
    payload,
  };
};
