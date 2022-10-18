import { fetchWrapper } from "@utils";
import { IFollowCountResponse, ICreateOrDeleteResponse, IFollowCheckResponse } from "./follow.interface";

const PATH = "/follow";

export const followCheck = async (query: { followedId: number }): Promise<IFollowCheckResponse> => {
  return await fetchWrapper(`${PATH}`, { query, token: true });
};

export const createOrDeleteFollow = async (body: { followedId: number }): Promise<ICreateOrDeleteResponse> => {
  return await fetchWrapper(`${PATH}`, {
    method: "POST",
    token: true,
    body,
  });
};

export const followCount = async (query: { authorId: number }): Promise<IFollowCountResponse> => {
  return await fetchWrapper(`${PATH}/count`, { query });
};
