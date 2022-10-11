import { fetchWrapper } from "@utils";
import { ICategoryResponse } from "./categories.interface";

export const getAllCategories = async (): Promise<ICategoryResponse[]> => {
  return await fetchWrapper(`/category`);
};
