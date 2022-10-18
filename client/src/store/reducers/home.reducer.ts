import { HomeActions, HomePageInitialInterface, PostsActionTypesEnum } from "@store/types/home.types";

const initialState: HomePageInitialInterface = {
  posts: { count: 0, posts: [] },
};

export const HomeReducer = (state = initialState, action: HomeActions): HomePageInitialInterface => {
  switch (action.type) {
    case PostsActionTypesEnum.SET_HOME_POSTS:
      return { ...state, posts: action.payload };
    default:
      return { ...state };
  }
};
