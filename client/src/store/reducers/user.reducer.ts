import { UserActions, UserActionTypesEnum, UserInitialInterface } from "@store/types/user.types";

const initialState: UserInitialInterface = {
  user: null,
  isAuth: null,
  isAdmin: false,
};

export const UserReducer = (state = initialState, action: UserActions): UserInitialInterface => {
  switch (action.type) {
    case UserActionTypesEnum.SET_USER:
      return { ...state, user: action.payload, isAuth: true };
    case UserActionTypesEnum.SET_AUTH:
      return { ...state, isAuth: action.payload };
    case UserActionTypesEnum.SET_LOGOUT:
      return { ...state, user: null, isAdmin: false, isAuth: false };
    default:
      return { ...state };
  }
};
