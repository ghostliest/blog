import { RootState } from "@store/reducers";
import { createSelector } from "reselect";

const postId = ({
  server: {
    post: { post },
  },
}: RootState) => post?.id;

const post = ({
  server: {
    post: { post },
  },
}: RootState) => post!;

const authorId = ({
  server: {
    post: { post },
  },
}: RootState) => post?.user.id!;

const authorPosts = ({
  server: {
    post: { authorPosts },
  },
}: RootState) => authorPosts!;

export const selectPostId = createSelector(postId, (v) => v);
export const selectPost = createSelector(post, (v) => v);
export const selectAuthorId = createSelector(authorId, (v) => v);
export const selectAuthorPosts = createSelector(authorPosts, (v) => v);
