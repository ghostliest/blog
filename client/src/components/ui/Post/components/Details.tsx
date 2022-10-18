import { Category, Tag } from "@ui";
import { IGetOnePostCategory, IPostTags } from "@services";
import { LinkToPost } from ".";

interface DetailsProps {
  showCategory: boolean;
  category: IGetOnePostCategory;
  tags: IPostTags[];
  postId: number;
  title: string;
  description: string;
}

export const Details = (props: DetailsProps) => {
  const { category, showCategory, tags, postId, title, description } = props;

  return (
    <div className="flex flex-col gap-1.5">
      {showCategory && (
        <Category cId={category.id} widthFull={true}>
          {category.value}
        </Category>
      )}
      <div className="flex gap-1 flex-wrap">
        {tags.map(({ tag: { id, value } }) => (
          <Tag key={id} tId={id}>
            {value}
          </Tag>
        ))}
      </div>

      <p className="text-xl font-semibold text-gray-900 dark:text-white">
        <LinkToPost id={postId}>{title}</LinkToPost>
      </p>
      <p className="text-base text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  );
};
