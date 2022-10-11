import { RootState } from "@store/reducers";
import { createSelector } from "reselect";

const query = ({ client: { pages } }: RootState) => pages.home.query;
const page = ({ client: { pages } }: RootState) => pages.home.query.page;
const limit = ({ client: { pages } }: RootState) => pages.home.query.limit;
const categoryId = ({ client: { pages } }: RootState) => pages.home.query.categoryId;
const tags = ({ client: { pages } }: RootState) => pages.home.query.tags;
const sort = ({ client: { pages } }: RootState) => pages.home.query.sort;
const orderBy = ({ client: { pages } }: RootState) => pages.home.query.orderBy;

export const selectHomeQuery = createSelector(query, (v) => v);
export const selectHomeQueryPage = createSelector(page, (v) => v);
export const selectHomeQueryLimit = createSelector(limit, (v) => v);
export const selectHomeQueryCategoryId = createSelector(categoryId, (id) => id);
export const selectHomeQueryTags = createSelector(tags, (v) => v);
export const selectHomeQuerySort = createSelector(sort, (v) => v);
export const selectHomeQueryOrder = createSelector(orderBy, (v) => v);
export const selectHomeQueryFilter = createSelector([sort, orderBy], (sort, orderBy) => ({ sort, orderBy }));
export const selectHomeQueryPagination = createSelector([page, limit], (page, limit) => ({ page, limit }));
export const selectShowCategory = createSelector(categoryId, (v) => !v);
