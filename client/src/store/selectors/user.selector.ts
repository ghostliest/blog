import { RootState } from "@store/reducers";
import { createSelector } from "reselect";

const isAuth = ({ client: { user } }: RootState) => user.isAuth;
const userId = ({ client: { user } }: RootState) => user.user?.id;
const user = ({ client: { user } }: RootState) => user.user!;

export const selectIsAuth = createSelector(isAuth, (auth) => auth);
export const selectUserId = createSelector(userId, (id) => id);
export const selectUser = createSelector(user, (val) => val);
