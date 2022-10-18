import { useTypedSelector } from "@hooks";
import { selectCmsPosts } from "@store/selectors/cms.selector";
import { PostItem, NotFound } from "./components";

export const Posts = () => {
  const posts = useTypedSelector(selectCmsPosts);

  return posts?.count ? (
    <div className="grid grid-rows">
      {posts?.posts.map((post, idx) => (
        <PostItem key={post.id} post={post} idx={idx} className={idx % 2 === 0 ? "bg-indigo-50" : ""} />
      ))}
    </div>
  ) : (
    <NotFound />
  );
};
