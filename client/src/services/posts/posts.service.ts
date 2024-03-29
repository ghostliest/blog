import { fetchWrapper } from "@utils";
import {
  IGetAllPostsResponse,
  IGetAllPostsQuery,
  IGetOnePostResponse,
  IGetAllUserPosts,
  IUserPostsResponse,
  IPostCountResponse,
  ICreatePostResponse,
  IDeletePostResponse,
  IGetAuthorPostsResponse,
  IGetAuthorPostsQuery,
} from "./posts.interface";

const PATH = "/post";

export const getAllPosts = async (query: IGetAllPostsQuery): Promise<IGetAllPostsResponse> => {
  const { page = 1, limit = 6, categoryId, authorId, tags = "", sort = "date", orderBy = "desc" } = query;

  const handleQuery = (): any => {
    const obj: any = {
      page,
      limit,
      authorId,
      sort,
      orderBy,
    };

    if (categoryId !== 0) {
      obj.categoryId = categoryId;
    }

    if (tags[0] !== 0) {
      obj.tags = tags;
    }

    return obj;
  };

  return await fetchWrapper(`${PATH}`, { query: handleQuery() });
};

export const getAuthorPosts = async (query: IGetAuthorPostsQuery): Promise<IGetAuthorPostsResponse> => {
  return await fetchWrapper(`${PATH}/get-posts-by-author`, { query });
};

export const getOnePost = async (postId: number): Promise<IGetOnePostResponse> => {
  return await fetchWrapper(`${PATH}/${postId}`);
};

export const getOnePostProtected = async (postId: number): Promise<IGetOnePostResponse> => {
  return await fetchWrapper(`${PATH}/get-one-cms/${postId}`, { token: true });
};

export const getAllUserPosts = async ({ page, limit, status }: IGetAllUserPosts): Promise<IUserPostsResponse> => {
  const handleQuery = () => {
    const query: any = {
      page,
      limit,
    };
    if (status) {
      query.status = status;
    }
    return query;
  };

  return await fetchWrapper(`${PATH}/user`, {
    query: handleQuery(),
    token: true,
  });
};

export const getCountUserPosts = async (): Promise<IPostCountResponse> => {
  return await fetchWrapper(`${PATH}/count`, { token: true });
};

export const createPost = async (body: FormData): Promise<ICreatePostResponse> => {
  return await fetchWrapper(`${PATH}`, {
    method: "POST",
    token: true,
    body,
  });
};

export const updatePost = async (postId: number, body: FormData): Promise<ICreatePostResponse> => {
  return await fetchWrapper(`${PATH}/${postId}`, {
    method: "PUT",
    token: true,
    body,
  });
};

export const deletePost = async (body: { id: number }): Promise<IDeletePostResponse> => {
  return await fetchWrapper(`${PATH}`, {
    method: "DELETE",
    token: true,
    body,
  });
};

export const getPostImg = async (img: string): Promise<File> => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL_POST_IMG}/${img}`)
    .then((res) => res.blob())
    .then((blob) => new File([blob], img));
};
