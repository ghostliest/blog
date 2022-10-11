import { AdditionalActions, AdditionalActionTypesEnum, AdditionalInitialInterface } from "@store/types/additional.types";

const initialState: AdditionalInitialInterface = {
  isHydrated: null,
};

export const AdditionalReducer = (state = initialState, action: AdditionalActions): AdditionalInitialInterface => {
  switch (action.type) {
    case AdditionalActionTypesEnum.SET_HYDRATED:
      return { ...state, isHydrated: action.payload };
    default:
      return { ...state };
  }
};
