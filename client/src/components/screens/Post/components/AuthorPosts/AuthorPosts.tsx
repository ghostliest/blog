import { Button } from "@ui";
import { useTypedSelector } from "@hooks";
import { PublicRoutesEnum } from "@constants";
import { selectAuthorId, selectAuthorPosts } from "@store/selectors/post.selector";
import { AuthorPost } from "..";

export const AuthorPosts = () => (
  <div className="flex flex-col gap-2">
    <h2 className="text-center">OTHER ARTICLES BY THE AUTHOR</h2>
    <Posts />
    <ViewMoreBtn />
  </div>
);

const Posts = () => {
  const posts = useTypedSelector(selectAuthorPosts);

  return (
    <div className="grid gap-2 lg:grid-cols-1 md:grid-cols-2">
      {posts?.posts.map((post) => (
        <AuthorPost key={post.id} post={post} />
      ))}
    </div>
  );
};

const ViewMoreBtn = () => {
  const authorId = useTypedSelector(selectAuthorId);

  return (
    <Button className="w-full" href={PublicRoutesEnum.POSTS_BY_USER + `/${authorId}`}>
      VIEW MORE
    </Button>
  );
};
