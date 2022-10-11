export type sortType = "date" | "popular" | "views";
export type orderByType = "desc" | "asc";
export type PostStatusType = "DRAFT" | "ACTIVE" | "BLOCKED";

export interface IPost {
  id: number;
  title: string;
  description: string;
  img: string;
  views: number;
  createAt: string;
  PostTag: IPostTags[];
  user: IGetOnePostUser;
  category: IGetOnePostCategory;
}

export interface IAuthorPost {
  id: number;
  title: string;
  img: string;
  views: number;
  createAt: string;
  PostTag: IPostTags[];
  category: IGetOnePostCategory;
}

export interface IGetAuthorPostsResponse {
  count: number;
  posts: IAuthorPost[];
}

export interface IGetAllPostsResponse {
  count: number;
  posts: IPost[];
}

export interface IGetAuthorPostsQuery {
  authorId: number;
  page: number;
  limit: number;
}

export interface IGetAllPostsQuery<T = number, A = number[]> {
  page: T;
  limit: T;
  categoryId?: T;
  authorId?: T;
  tags?: A;
  sort?: sortType;
  orderBy?: orderByType;
}

export interface IGetAllPostsQuerySSR {
  page: number | string;
  limit: number | string;
  categoryId: number | string;
  authorId?: number | undefined | null;
  tags: number[] | string;
  sort: sortType;
  orderBy: orderByType;
}

export interface IGetAllPostsResponse {
  count: number;
  posts: IPost[];
}

export interface IGetOnePostCategory {
  id: number;
  value: string;
}

export interface IGetOnePostUser {
  id: number;
  firstname: string;
  lastname: string;
}

export interface IPostTags {
  tag: {
    id: number;
    value: string;
  };
}

export interface IGetOnePostResponse {
  id: number;
  title: string;
  description: string;
  content: string;
  img: string;
  views: number;
  createAt: string;
  updatedAt: string;
  PostTag: IPostTags[];
  user: IGetOnePostUser;
  category: IGetOnePostCategory;
}

export interface IGetAllUserPosts {
  page: number;
  limit: number;
  status: PostStatusType | undefined;
}

export interface IUserPost {
  id: number;
  title: string;
  createAt: string;
  updatedAt: string;
  status: string;
  category: {
    id: number;
    value: string;
  };
  PostTag: {
    tag: {
      id: number;
      value: string;
    };
  }[];
}

export interface IUserPostsResponse {
  count: number | undefined;
  posts: IUserPost[] | [];
}

export interface IPostCountResponse {
  DRAFT: number;
  ACTIVE: number;
  BLOCKED: number;
}

export interface ICreatePostResponse {
  id: number;
  title: string;
  description: string;
  content: string;
  img: string;
  status: PostStatusType;
  views: number;
  userId: number;
  categoryId: number;
  createAt: Date;
  updatedAt: Date;
}

export interface IDeletePostResponse {
  result: "ok";
}
