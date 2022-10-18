import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import { CmsReducer } from "./cms.reducer";
import { HomeReducer } from "./home.reducer";
import { PagesReducer } from "./pages.reducer";
import { PostReducer } from "./post.reducer";
import { UserReducer } from "./user.reducer";
import { AdditionalReducer } from "./additional.reduces";
import { PostsByUserReducer } from "./postsByUser.reducer";
import { LayoutReducer } from "./layout.reducer";

const clientReducer = combineReducers({
  postsByUser: PostsByUserReducer,
  user: UserReducer,
  cms: CmsReducer,
  layout: LayoutReducer,
  pages: PagesReducer,
});

const serverReducer = combineReducers({
  home: HomeReducer,
  post: PostReducer,
  additional: AdditionalReducer,
});

export const rootReducer = combineReducers({
  client: clientReducer,
  server: serverReducer,
});

export const reducer = (state: RootState, action: { type: any; payload: RootState }): RootState => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        server: {
          ...state.server,
          ...action.payload,
        },
      };
    case "HOME_PAGE":
      return {
        home: state.server.home,
      } as unknown as RootState;
    case "POST_PAGE":
      return {
        post: state.server.post,
      } as unknown as RootState;
    default:
      return rootReducer(state, action);
  }
};

export type RootState = ReturnType<typeof rootReducer>;
