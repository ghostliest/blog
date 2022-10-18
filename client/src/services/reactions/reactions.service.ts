import { fetchWrapper } from "@utils";
import { IAddOrDeleteReactionsResponse, IQuery, IReactionsResponse, ReactionsCategoryType } from "./reactions.interface";

const PATH = "/reaction";

export const getReacions = async ({ postId, userId }: IQuery): Promise<IReactionsResponse> => {
  const handleQuery = (): IQuery => {
    const hQuery = { postId } as IQuery;
    if (userId) {
      hQuery.userId = userId;
    }
    return hQuery;
  };

  return await fetchWrapper(`${PATH}`, { query: handleQuery() });
};

export const addOrDeleteReactions = async (body: {
  category: ReactionsCategoryType;
  postId: number;
}): Promise<IAddOrDeleteReactionsResponse> => {
  return await fetchWrapper(`${PATH}`, {
    method: "POST",
    token: true,
    body,
  });
};
