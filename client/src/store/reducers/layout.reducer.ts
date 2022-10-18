import { LayoutActions, LayoutActionTypesEnum, LayoutInitialInterface } from "@store/types/layout.types";

const initialState: LayoutInitialInterface = {
  header: {
    height: 40,
  },
  authorsTop: {
    height: 0,
  },
};

export const LayoutReducer = (state = initialState, action: LayoutActions): LayoutInitialInterface => {
  switch (action.type) {
    case LayoutActionTypesEnum.SET_LAYOUT_HEADER:
      return { ...state, header: { ...state.header, ...action.payload } };
    case LayoutActionTypesEnum.SET_LAYOUT_AUTHOR_TOP:
      return { ...state, authorsTop: { ...state.authorsTop, ...action.payload } };
    default:
      return { ...state };
  }
};
