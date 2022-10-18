import { fetchWrapper } from "@utils";
import { IRefreshTokenResponse, ISignInResponse, ISignUpResponse } from "./auth.interface";

const PATH = "/auth";

export const signIn = async (body: { email: string; password: string }): Promise<ISignInResponse> => {
  return await fetchWrapper(`${PATH}/signin`, {
    method: "POST",
    body,
  });
};

export const signUp = async (body: {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
}): Promise<ISignUpResponse> => {
  return await fetchWrapper(`${PATH}/signup`, {
    method: "POST",
    body,
  });
};

export const refreshToken = async (): Promise<IRefreshTokenResponse> => {
  return await fetchWrapper(`${PATH}/refresh`, { token: true });
};
