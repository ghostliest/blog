import { Poster, Details, Author } from "./components";
import { PostProps } from "./Post.props";

export const Post = ({ post, showCategory = false, showAuthor = true }: PostProps) => {
  const { id, title, views, img, description, user, category, PostTag, createAt } = post;

  return (
    <>
      <Poster postId={id} img={img} />
      <div className="flex-1 p-6 !pt-3 flex flex-col gap-1.5 justify-between break-words bg-white dark:bg-gray-800">
        <Details
          postId={id}
          title={title}
          description={description}
          category={category}
          tags={PostTag}
          showCategory={showCategory}
        />
        <Author user={user} views={views} showAuthor={showAuthor} createAt={createAt} />
      </div>
    </>
  );
};
