export interface ICreateOrDeleteResponse {
  result: "create" | "destroy";
}

export interface IFollowCountResponse {
  followers: number;
  followed: number;
}

export interface IFollowCheckResponse {
  follow: boolean;
}
