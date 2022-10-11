import { fetchWrapper } from "@utils";
import {
  IAuthorsStatisticQuery,
  IAuthorStatisticQuery,
  IGetAuthorsStatisticResponse,
  IGetAuthorStatisticResponse,
} from "./statistics.interface";

const PATH = "/statistics";

export const getAuthorsStatistic = async (query: IAuthorsStatisticQuery): Promise<IGetAuthorsStatisticResponse[]> => {
  return fetchWrapper(`${PATH}/authors-top`, { query });
};

export const getAuthorStatistic = async (query: IAuthorStatisticQuery): Promise<IGetAuthorStatisticResponse> => {
  return fetchWrapper(`${PATH}/author`, { query });
};
