import { useTypedSelector } from "@hooks";
import { Tag } from "@ui";
import { selectPost } from "@store/selectors/post.selector";

export const Tags = () => {
  const { PostTag } = useTypedSelector(selectPost);

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {PostTag.map(({ tag: { id, value } }) => (
        <Tag key={id} tId={id}>
          {value}
        </Tag>
      ))}
    </div>
  );
};
