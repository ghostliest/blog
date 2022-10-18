import { fetchWrapper } from "@utils";
import { IUser } from "./user.interface";

const PATH = "/user";

export const getUser = async (userId: number): Promise<IUser> => {
  return await fetchWrapper(`${PATH}/${userId}`);
};
