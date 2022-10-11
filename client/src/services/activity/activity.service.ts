import { fetchWrapper } from "@utils";
import { IActivityQuery, IActivityResponse } from "./activity.interface";

export const getActivity = async (query: IActivityQuery): Promise<IActivityResponse[]> => {
  return await fetchWrapper("/activity", { query });
};
