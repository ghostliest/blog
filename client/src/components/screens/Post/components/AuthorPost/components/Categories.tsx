import { IGetOnePostCategory } from "@services";
import { Category } from "@ui";

export const Categories = ({ category }: { category: IGetOnePostCategory }) => (
  <Category cId={category.id} size="s">
    {category.value}
  </Category>
);
