import {
  UserActionTypesEnum,
  UserInterface,
  UserActionInterface,
  AuthActionInterface,
  LogoutActionInterface,
} from "../types/user.types";

export const setUser = (value: UserInterface): UserActionInterface => {
  return {
    type: UserActionTypesEnum.SET_USER,
    payload: value,
  };
};

export const setLogout = (): LogoutActionInterface => {
  return {
    type: UserActionTypesEnum.SET_LOGOUT,
  };
};

export const setAuth = (payload: boolean | null): AuthActionInterface => {
  return {
    type: UserActionTypesEnum.SET_AUTH,
    payload,
  };
};
