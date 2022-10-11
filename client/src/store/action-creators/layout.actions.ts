import {
  IAuthorsTop,
  IHeader,
  LayoutActionTypesEnum,
  LayoutAuthorTopActionInterface,
  LayoutHeaderActionInterface,
} from "@store/types/layout.types";

export const setLayoutHeader = (payload: IHeader): LayoutHeaderActionInterface => {
  return {
    type: LayoutActionTypesEnum.SET_LAYOUT_HEADER,
    payload,
  };
};

export const setLayoutAuthorTop = (payload: IAuthorsTop): LayoutAuthorTopActionInterface => {
  return {
    type: LayoutActionTypesEnum.SET_LAYOUT_AUTHOR_TOP,
    payload,
  };
};
