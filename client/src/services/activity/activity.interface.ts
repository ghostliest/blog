export type ActivityType = "like" | "favorite" | "follow";

export interface IActivityQuery {
  page: number;
  limit: number;
}

export interface IActivityResponse {
  createAt: Date;
  type: ActivityType;
  data: IDataReaction | IDataFollow;
}

export interface IPostReaction {
  id: number;
  title: string;
}

export interface IUserReaction {
  id: number;
  firstname: string;
  lastname: string;
  createAt: Date;
}

export interface IDataFollow {
  follower: IUserReaction;
  followed: IUserReaction;
}

export interface IDataReaction {
  post: IPostReaction;
  user: IUserReaction;
}
