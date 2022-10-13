import { useTypedSelector } from "@hooks";
import { selectPost } from "@store/selectors/post.selector";
import { Category } from "@ui";

export const CategoryWrap = () => {
  const { category } = useTypedSelector(selectPost);

  return (
    <div className="flex items-center gap-1">
      <span>Category: </span>
      <Category cId={category.id}>{category.value}</Category>
    </div>
  );
};
