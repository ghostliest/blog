import { Card } from "@ui";
import { useTypedSelector } from "@hooks";
import { selectLayoutAuthorsTopHeight } from "@store/selectors/layout.selector";
import { selectLayoutHeaderHeight } from "@store/selectors/layout.selector";
import { AuthorsTop, LastActivity } from "./components";

export const Aside = () => {
  const height = useTypedSelector(selectLayoutAuthorsTopHeight);
  const headerHeight = useTypedSelector(selectLayoutHeaderHeight);

  return (
    <aside>
      <div className="overflow-hidden xl:sticky w-full" style={{ top: `${headerHeight}px` }}>
        <Card
          className="flex gap-4 w-full h-auto p-4 pr-0 sm:flex-row xl:flex-col xl:!h-full child:w-full"
          style={height ? { height: `calc(${height}px + 32px)` } : {}}
        >
          <AuthorsTop />
          <span className="border-t pr-4 hidden xl:block" style={{ width: `calc(100% - 1rem)` }}></span>
          <LastActivity />
        </Card>
      </div>
    </aside>
  );
};
