import { IGetAllPostsQuery, orderByType, sortType } from "@services";
import {
  CategoryActionInterface,
  FilterActionInterface,
  FilterOrderByActionInterface,
  FilterSortActionInterface,
  IQueryFilter,
  LimitActionInterface,
  PageActionInterface,
  PagesActionTypesEnum,
  QueryActionInterface,
  TagsActionInterface,
} from "@store/types/pages.types";

export const setHomeQueryPage = (payload: number): PageActionInterface => {
  return {
    type: PagesActionTypesEnum.SET_HOME_QUERY_PAGE,
    payload,
  };
};

export const setHomeQuery = (payload: IGetAllPostsQuery): QueryActionInterface => {
  return {
    type: PagesActionTypesEnum.SET_HOME_QUERY,
    payload,
  };
};

export const setHomeQueryLimit = (payload: number): LimitActionInterface => {
  return {
    type: PagesActionTypesEnum.SET_HOME_QUERY_LIMIT,
    payload,
  };
};

export const setHomeQueryTags = (payload: number[]): TagsActionInterface => {
  return {
    type: PagesActionTypesEnum.SET_HOME_QUERY_TAGS,
    payload,
  };
};

export const setHomeQueryCategory = (payload: number): CategoryActionInterface => {
  return {
    type: PagesActionTypesEnum.SET_HOME_QUERY_CATEGORY,
    payload,
  };
};

export const setHomeQueryFilter = (payload: IQueryFilter): FilterActionInterface => {
  return {
    type: PagesActionTypesEnum.SET_HOME_QUERY_FILTER,
    payload,
  };
};

export const setHomeQueryFilterSort = (payload: sortType): FilterSortActionInterface => {
  return {
    type: PagesActionTypesEnum.SET_HOME_QUERY_FILTER_SORT,
    payload,
  };
};

export const setHomeQueryFilterOrderBy = (payload: orderByType): FilterOrderByActionInterface => {
  return {
    type: PagesActionTypesEnum.SET_HOME_QUERY_FILTER_ORDER_BY,
    payload,
  };
};
