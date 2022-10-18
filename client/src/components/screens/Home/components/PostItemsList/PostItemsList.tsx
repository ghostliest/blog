import { Post } from "@ui";
import { useTypedSelector } from "@hooks";
import { selectHomeQueryCategoryId } from "@store/selectors/pages.selector";
import { selectPosts } from "@store/selectors/home.selector";
import { IGetAllPostsResponse } from "@services";
import { NotFound } from "./components/NotFound";

export const PostItemsList = () => {
  const posts = useTypedSelector(selectPosts);
  const categoryId = useTypedSelector(selectHomeQueryCategoryId);

  return posts?.count ? <PostsList posts={posts} showCategory={!categoryId} /> : <NotFound />;
};

const PostsList = ({ posts, showCategory }: { posts: IGetAllPostsResponse | null; showCategory: boolean }) => (
  <ul className="max-w-lg mx-auto grid gap-5 lg:grid-cols-3 md:grid-cols-2 md:max-w-fit lg:max-w-none">
    {posts?.posts.map((post) => (
      <li key={post.id} className="flex flex-col rounded-[2rem] shadow-lg overflow-hidden">
        <Post post={post} showCategory={showCategory} />
      </li>
    ))}
  </ul>
);
