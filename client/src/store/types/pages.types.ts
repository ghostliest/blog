import { IGetAllPostsQuery, orderByType, sortType } from "@services";

export interface PagesInitialInterface {
  home: HomePageInterface;
}

interface HomePageInterface {
  query: IGetAllPostsQuery;
}

export enum PagesActionTypesEnum {
  SET_HOME_QUERY = "SET_HOME_QUERY",
  SET_HOME_QUERY_PAGE = "SET_HOME_QUERY_PAGE",
  SET_HOME_QUERY_LIMIT = "SET_HOME_QUERY_LIMIT",
  SET_HOME_QUERY_TAGS = "SET_HOME_QUERY_TAGS",
  SET_HOME_QUERY_CATEGORY = "SET_HOME_QUERY_CATEGORY",
  SET_HOME_QUERY_FILTER = "SET_HOME_QUERY_FILTER",
  SET_HOME_QUERY_FILTER_SORT = "SET_HOME_QUERY_FILTER_SORT",
  SET_HOME_QUERY_FILTER_ORDER_BY = "SET_HOME_QUERY_FILTER_ORDER_BY",
}

export interface QueryActionInterface {
  type: PagesActionTypesEnum.SET_HOME_QUERY;
  payload: IGetAllPostsQuery;
}

export interface PageActionInterface {
  type: PagesActionTypesEnum.SET_HOME_QUERY_PAGE;
  payload: number;
}

export interface LimitActionInterface {
  type: PagesActionTypesEnum.SET_HOME_QUERY_LIMIT;
  payload: number;
}

export interface TagsActionInterface {
  type: PagesActionTypesEnum.SET_HOME_QUERY_TAGS;
  payload: number[];
}

export interface CategoryActionInterface {
  type: PagesActionTypesEnum.SET_HOME_QUERY_CATEGORY;
  payload: number;
}

export interface IQueryFilter {
  sort: sortType;
  orderBy: orderByType;
}

export interface FilterActionInterface {
  type: PagesActionTypesEnum.SET_HOME_QUERY_FILTER;
  payload: IQueryFilter;
}

export interface FilterSortActionInterface {
  type: PagesActionTypesEnum.SET_HOME_QUERY_FILTER_SORT;
  payload: sortType;
}

export interface FilterOrderByActionInterface {
  type: PagesActionTypesEnum.SET_HOME_QUERY_FILTER_ORDER_BY;
  payload: orderByType;
}

export type PagesActions =
  | QueryActionInterface
  | PageActionInterface
  | LimitActionInterface
  | TagsActionInterface
  | CategoryActionInterface
  | FilterActionInterface
  | FilterSortActionInterface
  | FilterOrderByActionInterface;
