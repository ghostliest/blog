import { useTypedSelector } from "@hooks";
import { selectLayoutHeaderHeight } from "@store/selectors/layout.selector";
import { PostDetails, AuthorPosts } from "..";

export const RightSide = () => {
  const headerHeight = useTypedSelector(selectLayoutHeaderHeight);

  return (
    <aside>
      <div className="sticky" style={{ top: `${headerHeight}px` }}>
        <div className="flex flex-col gap-3">
          <PostDetails />
          <AuthorPosts />
        </div>
      </div>
    </aside>
  );
};
