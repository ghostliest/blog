import Link from "next/link";
import { PublicRoutesEnum } from "@constants";
import { useTypedSelector } from "@hooks";
import { IUserPost } from "@services";
import { Category } from "@ui";
import { selectCmsPostsWidth } from "@store/selectors/cms.selector";
import { ActionBtns, Tags, Date } from ".";

interface PostItemProps {
  post: IUserPost;
  idx: number;
  className: string;
}

export const PostItem = ({ post, idx, className }: PostItemProps) => {
  const { PostTag } = post;

  const size = useTypedSelector(selectCmsPostsWidth);

  const Title = () => (
    <div
      className={
        `[overflow-wrap:anywhere] text-gray-900 dark:text-white ` +
        `${size === "s" ? "text-base" : "text-xl"}` +
        `${size !== "l" ? " text-center" : ""}`
      }
    >
      <Link href={`${PublicRoutesEnum.POST}/${post.id}`}>{post.title}</Link>
    </div>
  );

  const DateWrap = () => <Date created={post.createAt} updated={post.updatedAt} />;

  return (
    <div
      className={`grid grid-cols-[2em_auto_4em] items-center gap-2 lg:gap-4 ${
        size === "s" ? "px-2 py-4" : "p-4"
      } border-t border-border-color ${className}`}
    >
      <div className="text-center">{idx + 1}</div>
      <div className="flex flex-col gap-2">
        {size !== "l" && <Title />}
        <div
          className={`grid items-center gap-2 lg:gap-4 ${size !== "l" ? "grid-cols-[4fr_4fr]" : "grid-cols-[6fr_4fr_4fr_2fr]"}`}
        >
          {size === "l" && <Title />}
          <Category cId={post.category.id} size={size === "s" ? "s" : "m"}>
            {post.category.value}
          </Category>
          <Tags tags={PostTag} />
          {size === "l" && <DateWrap />}
        </div>
        {size !== "l" && <DateWrap />}
      </div>
      <ActionBtns id={post.id} />
    </div>
  );
};
