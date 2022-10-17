import { RootState } from "@store/reducers";
import { createSelector } from "reselect";

const posts = ({ client: { cms } }: RootState) => cms.posts.posts;
const postsCount = ({ client: { cms } }: RootState) => cms.posts.posts?.count;
const postsQuery = ({ client: { cms } }: RootState) => cms.posts.query;
const postsQueryStatus = ({ client: { cms } }: RootState) => cms.posts.query.status;
const postsWidth = ({ client: { cms } }: RootState) => cms.posts.width;

const createdPost = ({ client: { cms } }: RootState) => cms.create.post;
const deletedPostId = ({ client: { cms } }: RootState) => cms.posts.deletePost.postId;
const deletedPost = ({ client: { cms } }: RootState) => cms.posts.deletePost.delete;

const layoutWidth = ({ client: { cms } }: RootState) => cms.layout.width;

export const selectCmsPostsQuery = createSelector(postsQuery, (val) => val);
export const selectCmsPostsQueryStatus = createSelector(postsQueryStatus, (val) => val);
export const selectCmsPostsCount = createSelector(postsCount, (val) => (val ? val : 0));
export const selectCmsPosts = createSelector(posts, (val) => val);
export const selectCmsPostsWidth = createSelector(postsWidth, (val) => val);

export const selectCmsCreatedPost = createSelector(createdPost, (val) => val);
export const selectCmsDeletedPostId = createSelector(deletedPostId, (val) => val);
export const selectCmsDeletedPost = createSelector(deletedPost, (val) => val);

export const selectCmsLayoutCmsWidth = createSelector(layoutWidth, (val) => val);
