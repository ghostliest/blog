import { RootState } from "@store/reducers";
import { createSelector } from "reselect";

const postsQuery = ({ client: { cms } }: RootState) => cms.posts.query;
const postsQueryStatus = ({ client: { cms } }: RootState) => cms.posts.query.status;
const postsCount = ({ client: { cms } }: RootState) => cms.posts.count;
const createdPost = ({ client: { cms } }: RootState) => cms.create.post;
const deletedPostId = ({ client: { cms } }: RootState) => cms.posts.deletePost.postId;
const deletedPost = ({ client: { cms } }: RootState) => cms.posts.deletePost.delete;

export const selectPostsQuery = createSelector(postsQuery, (val) => val);
export const selectPostsQueryStatus = createSelector(postsQueryStatus, (val) => val);
export const selectPostsCount = createSelector(postsCount, (val) => val);
export const selectCreatedPost = createSelector(createdPost, (val) => val);
export const selectDeletedPostId = createSelector(deletedPostId, (val) => val);
export const selectDeletedPost = createSelector(deletedPost, (val) => val);
