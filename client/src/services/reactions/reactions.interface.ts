export type ReactionsCategoryType = "readingList" | "like";

export interface IReactionItemResponse {
  count: number;
  thisUser: boolean | undefined;
}

export interface IReactionsResponse {
  readingList: IReactionItemResponse;
  like: IReactionItemResponse;
}

export interface IQuery {
  postId: number;
  userId: number | undefined;
}

export interface IAddOrDeleteReactionsResponse {
  category: ReactionsCategoryType;
  result: "create" | "destroy";
}
