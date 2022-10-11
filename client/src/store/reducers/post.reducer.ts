import { PostActions, PostInitialInterface, PostActionTypesEnum } from "@store/types/post.types";

const initialState: PostInitialInterface = {
  post: null,
  authorPosts: null,
};

export const PostReducer = (state = initialState, action: PostActions): PostInitialInterface => {
  switch (action.type) {
    case PostActionTypesEnum.SET_POST:
      return { ...state, post: action.payload };
    case PostActionTypesEnum.SET_AUTHOR_POSTS:
      return { ...state, authorPosts: action.payload };
    default:
      return { ...state };
  }
};
