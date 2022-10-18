import { IGetAuthorPostsResponse, IGetOnePostResponse } from "@services";
import { AuthorPostsActionInterface, PostActionInterface, PostActionTypesEnum } from "@store/types/post.types";

export const setPost = (payload: IGetOnePostResponse): PostActionInterface => {
  return {
    type: PostActionTypesEnum.SET_POST,
    payload,
  };
};

export const setAuthorPosts = (payload: IGetAuthorPostsResponse): AuthorPostsActionInterface => {
  return {
    type: PostActionTypesEnum.SET_AUTHOR_POSTS,
    payload,
  };
};
