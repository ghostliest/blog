export interface ISignInResponse {
  message: string | [{ [key: string]: string[] }];
  statusCode: number;
  token: string;
}

export interface ISignUpResponse extends ISignInResponse {}

export interface IRefreshTokenResponse {
  token: string;
}
