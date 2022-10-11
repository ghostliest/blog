import { CmsActions, CmsActionTypesEnum, CmsInitialInterface } from "@store/types/cms.types";

const initialState: CmsInitialInterface = {
  posts: {
    deletePost: {
      postId: null,
      delete: false,
    },
    query: {
      page: 1,
      limit: 10,
      status: "ALL",
    },
    count: 0,
  },
  create: {
    post: {
      errorMessage: "",
      showSuccessNotification: false,
    },
  },
};

export const CmsReducer = (state = initialState, action: CmsActions): CmsInitialInterface => {
  switch (action.type) {
    case CmsActionTypesEnum.SET_DELETE_POST_ID:
      return { ...state, posts: { ...state.posts, deletePost: { ...state.posts.deletePost, postId: action.payload } } };
    case CmsActionTypesEnum.SET_DELETE_POST:
      return { ...state, posts: { ...state.posts, deletePost: { ...state.posts.deletePost, delete: action.payload } } };
    case CmsActionTypesEnum.SET_POSTS_QUERY:
      return { ...state, posts: { ...state.posts, query: { ...state.posts.query, ...action.payload } } };
    case CmsActionTypesEnum.SET_POSTS_QUERY_PAGE:
      return { ...state, posts: { ...state.posts, query: { ...state.posts.query, page: action.payload } } };
    case CmsActionTypesEnum.SET_POSTS_QUERY_STATUS:
      return { ...state, posts: { ...state.posts, query: { ...state.posts.query, status: action.payload } } };
    case CmsActionTypesEnum.SET_POSTS_COUNT:
      return { ...state, posts: { ...state.posts, count: action.payload } };
    case CmsActionTypesEnum.SET_ERROR_MES_ON_POST_CREATE:
      return { ...state, create: { ...state.create, post: { ...state.create.post, errorMessage: action.payload } } };
    case CmsActionTypesEnum.SET_SHOW_SUCCESS_POST_CREATE_NOTIFICATION:
      return { ...state, create: { ...state.create, post: { ...state.create.post, showSuccessNotification: action.payload } } };
    default:
      return { ...state };
  }
};
