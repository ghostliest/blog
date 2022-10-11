import { PostsByUserActions, PostsByUserInitialInterface, PostsByUserActionTypesEnum } from "@store/types/postsByUser.types";

const initialState: PostsByUserInitialInterface = {
  posts: {
    count: 0,
    posts: null,
  },
  query: {
    page: 1,
    limit: 6,
    authorId: 0,
    categoryId: 0,
    tags: [0],
    sort: "date",
    orderBy: "desc",
  },
  author: null,
};

export const PostsByUserReducer = (state = initialState, action: PostsByUserActions): PostsByUserInitialInterface => {
  switch (action.type) {
    case PostsByUserActionTypesEnum.SET_AUTHOR_POSTS_POSTS:
      return { ...state, posts: { ...state.posts, posts: action.payload } };
    case PostsByUserActionTypesEnum.SET_AUTHOR_POSTS_COUNT:
      return { ...state, posts: { ...state.posts, count: action.payload } };
    case PostsByUserActionTypesEnum.SET_AUTHOR_POSTS_QUERY:
      return { ...state, query: action.payload };
    case PostsByUserActionTypesEnum.SET_AUTHOR_POSTS_AUTHOR:
      return { ...state, author: action.payload };
    default:
      return { ...state };
  }
};
