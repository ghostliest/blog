import * as UserActionCreators from "./user.actions";
import * as CmsActionCreators from "./cms.actions";
import * as HomeActionCreators from "./home.actions";
import * as PostActionCreators from "./post.actions";
import * as AdditionalActionCreators from "./additional.actions";
import * as PostsByUserActionCreators from "./postsByUser.actions";
import * as PagesActionCreators from "./pages.actions";
import * as LayoutActionCreators from "./layout.actions";

const ActionCreators = {
  ...UserActionCreators,
  ...CmsActionCreators,
  ...HomeActionCreators,
  ...PostActionCreators,
  ...AdditionalActionCreators,
  ...PostsByUserActionCreators,
  ...PagesActionCreators,
  ...LayoutActionCreators,
};

export default ActionCreators;
