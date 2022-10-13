import { useTypedSelector } from "@hooks";
import { selectPost } from "@store/selectors/post.selector";

export const Content = () => {
  const { content } = useTypedSelector(selectPost);

  return (
    <div className="px-4 lg:px-10 [overflow-wrap:anywhere]">
      <p className="text-xl">{content}</p>
    </div>
  );
};
