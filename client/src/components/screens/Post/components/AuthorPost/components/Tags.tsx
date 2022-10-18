import { IPostTags } from "@services";
import { Tag } from "@ui";

export const Tags = ({ PostTag }: { PostTag: IPostTags[] }) => (
  <div className="flex flex-row gap-2">
    {PostTag.slice(0, 3).map(({ tag: { id, value } }) => (
      <Tag key={id} tId={id} size="s">
        {value}
      </Tag>
    ))}
  </div>
);
