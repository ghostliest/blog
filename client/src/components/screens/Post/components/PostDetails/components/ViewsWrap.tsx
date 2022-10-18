import { useTypedSelector } from "@hooks";
import { Views } from "@ui";
import { selectPost } from "@store/selectors/post.selector";

export const ViewsWrap = () => {
  const { views } = useTypedSelector(selectPost);

  return <Views appearance="dark" views={views} />;
};
