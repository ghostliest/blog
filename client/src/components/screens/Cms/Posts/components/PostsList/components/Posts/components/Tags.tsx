import { Tag } from "@ui";
import { IPostTags } from "@services";
import { useTypedSelector } from "@hooks";
import { selectCmsPostsWidth } from "@store/selectors/cms.selector";

export const Tags = ({ tags }: { tags: IPostTags[] }) => {
  const size = useTypedSelector(selectCmsPostsWidth);

  return (
    <div className="flex gap-1 flex-wrap py-2">
      {tags.map(({ tag: { id, value } }) => (
        <Tag key={id} tId={id} size={size === "s" ? "s" : "m"} className="w-fit">
          {value}
        </Tag>
      ))}
    </div>
  );
};
