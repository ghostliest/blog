import { fetchWrapper } from "@utils";
import { ITagResponse } from "./tags.interface";

export const getAllTags = async (): Promise<ITagResponse[]> => {
  return await fetchWrapper(`/tag`);
};
