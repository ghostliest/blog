import { IAuthorPost } from "@services";
import { Bottom, Categories, Img, Tags } from "./components";

export const AuthorPost = ({ post }: { post: IAuthorPost }) => {
  const { id, title, img, category, PostTag, views } = post;

  return (
    <div className="relative">
      <div className="absolute top-0 left-0 p-1 w-full flex flex-row gap-1 justify-around overflow-hidden backdrop-blur-md rounded-t-xl z-10">
        <Categories category={category} />
        <Tags PostTag={PostTag} />
      </div>
      <Bottom postId={id} title={title} views={views} />
      <Img id={id} img={img} />
    </div>
  );
};
