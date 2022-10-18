import { PagesActions, PagesActionTypesEnum, PagesInitialInterface } from "@store/types/pages.types";

const initialState: PagesInitialInterface = {
  home: {
    query: {
      page: 1,
      limit: 6,
      categoryId: 0,
      tags: [0],
      sort: "date",
      orderBy: "desc",
    },
  },
};

export const PagesReducer = (state = initialState, action: PagesActions): PagesInitialInterface => {
  switch (action.type) {
    case PagesActionTypesEnum.SET_HOME_QUERY:
      return { ...state, home: { query: action.payload } };
    case PagesActionTypesEnum.SET_HOME_QUERY_PAGE:
      return { ...state, home: { query: { ...state.home.query, page: action.payload } } };
    case PagesActionTypesEnum.SET_HOME_QUERY_LIMIT:
      return { ...state, home: { query: { ...state.home.query, limit: action.payload } } };
    case PagesActionTypesEnum.SET_HOME_QUERY_CATEGORY:
      return { ...state, home: { query: { ...state.home.query, categoryId: action.payload } } };
    case PagesActionTypesEnum.SET_HOME_QUERY_TAGS:
      return { ...state, home: { query: { ...state.home.query, tags: action.payload } } };
    case PagesActionTypesEnum.SET_HOME_QUERY_FILTER:
      console.log("from pagesReducer: ", action);
      return {
        ...state,
        home: { ...state.home, query: { ...state.home.query, sort: action.payload.sort, orderBy: action.payload.orderBy } },
      };
    case PagesActionTypesEnum.SET_HOME_QUERY_FILTER_SORT:
      return {
        ...state,
        home: { ...state.home, query: { ...state.home.query, sort: action.payload } },
      };
    case PagesActionTypesEnum.SET_HOME_QUERY_FILTER_ORDER_BY:
      return {
        ...state,
        home: { ...state.home, query: { ...state.home.query, orderBy: action.payload } },
      };
    default:
      return { ...state };
  }
};
