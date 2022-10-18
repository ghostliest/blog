export interface IActivity extends IActivityItem {
  createAt: Date;
}

export interface IActivityItem {
  user: {
    id: number;
    firstname: string;
    lastname: string;
  };
  post: {
    id: number;
    title: string;
  };
}

export interface IActivityDto {
  page: number;
  limit: number;
}

export interface IActivityResponse {
  liked: IActivity[];
  favorites: IActivity[];
}
