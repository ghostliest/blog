export interface LayoutInitialInterface {
  header: IHeader;
  authorsTop: IAuthorsTop;
}

export interface IHeader {
  height?: number;
}

export interface IAuthorsTop {
  height?: number;
}

export enum LayoutActionTypesEnum {
  SET_LAYOUT_HEADER = "SET_LAYOUT_HEADER",
  SET_LAYOUT_AUTHOR_TOP = "SET_LAYOUT_AUTHOR_TOP",
}

export interface LayoutHeaderActionInterface {
  type: LayoutActionTypesEnum.SET_LAYOUT_HEADER;
  payload: IHeader;
}

export interface LayoutAuthorTopActionInterface {
  type: LayoutActionTypesEnum.SET_LAYOUT_AUTHOR_TOP;
  payload: IAuthorsTop;
}

export type LayoutActions = LayoutHeaderActionInterface | LayoutAuthorTopActionInterface;
