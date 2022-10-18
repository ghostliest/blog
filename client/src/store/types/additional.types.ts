export interface AdditionalInitialInterface {
  isHydrated: boolean | null;
}

export enum AdditionalActionTypesEnum {
  SET_HYDRATED = "SET_HYDRATED",
}

export interface HydratedActionInterface {
  type: AdditionalActionTypesEnum.SET_HYDRATED;
  payload: boolean | null;
}

export type AdditionalActions = HydratedActionInterface;
