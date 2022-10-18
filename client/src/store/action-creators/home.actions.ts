import { IGetAllPostsResponse } from "@services";
import { PostsActionInterface, PostsActionTypesEnum } from "@store/types/home.types";

export const setHomePosts = (payload: IGetAllPostsResponse): PostsActionInterface => {
  return {
    type: PostsActionTypesEnum.SET_HOME_POSTS,
    payload,
  };
};
