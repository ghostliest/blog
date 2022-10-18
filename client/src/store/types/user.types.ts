export interface UserInitialInterface {
  user: UserInterface | null;
  isAuth: boolean | null;
  isAdmin: boolean;
}

export interface UserInterface {
  id: number;
  email: string;
  role: "USER" | "ADMIN";
}

export enum UserActionTypesEnum {
  SET_USER = "SET_USER",
  SET_ADMIN = "SET_ADMIN",
  SET_AUTH = "SET_AUTH",
  SET_LOGOUT = "SET_LOGOUT",
}

export interface UserActionInterface {
  type: UserActionTypesEnum.SET_USER;
  payload: UserInterface;
}

export interface AdminActionInterface {
  type: UserActionTypesEnum.SET_ADMIN;
  payload: boolean;
}

export interface AuthActionInterface {
  type: UserActionTypesEnum.SET_AUTH;
  payload: boolean | null;
}

export interface LogoutActionInterface {
  type: UserActionTypesEnum.SET_LOGOUT;
}

export type UserActions = UserActionInterface | AdminActionInterface | AuthActionInterface | LogoutActionInterface;
