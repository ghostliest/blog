import { IPost } from "@services";

export interface PostProps {
  post: IPost;
  showCategory?: boolean;
  showAuthor?: boolean;
}
