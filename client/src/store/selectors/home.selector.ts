import { RootState } from "@store/reducers";
import { createSelector } from "reselect";

const posts = ({ server: { home } }: RootState) => home.posts;
const postsCount = ({ server: { home } }: RootState) => home.posts?.count;

export const selectPosts = createSelector(posts, (v) => v);
export const selectPostsCount = createSelector(postsCount, (v) => v);
