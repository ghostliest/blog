import { AdditionalActionTypesEnum, HydratedActionInterface } from "@store/types/additional.types";

export const setHydrated = (payload: boolean | null): HydratedActionInterface => {
  return {
    type: AdditionalActionTypesEnum.SET_HYDRATED,
    payload,
  };
};
