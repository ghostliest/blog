import { RootState } from "@store/reducers";
import { createSelector } from "reselect";

const posts = ({
  client: {
    postsByUser: { posts },
  },
}: RootState) => posts?.posts;

const count = ({
  client: {
    postsByUser: { posts },
  },
}: RootState) => posts?.count;

const query = ({
  client: {
    postsByUser: { query },
  },
}: RootState) => query;

const author = ({
  client: {
    postsByUser: { author },
  },
}: RootState) => author;

const authorId = ({
  client: {
    postsByUser: { author },
  },
}: RootState) => author?.id;

export const selectPostsByUser = createSelector(posts, (v) => v);
export const selectCountPostsByUser = createSelector(count, (v) => v);
export const selectQueryPostsByUser = createSelector(query, (v) => v);
export const selectAuthorPostsByUser = createSelector(author, (v) => v);
export const selectAuthorPostsByUserId = createSelector(authorId, (v) => v);
