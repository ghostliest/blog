import { useEffect, useState } from "react";
import { Card, ColorItem, Spinner } from "@ui";
import { useTypedSelector } from "@hooks";
import { getAuthorStatistic, IGetAuthorStatisticResponse } from "@services";
import { selectAuthorPostsByUserId } from "@store/selectors/postsByUser.selector";
import { selectLayoutHeaderHeight } from "@store/selectors/layout.selector";

export const Statistics = () => {
  const [statistics, setStatistics] = useState<IGetAuthorStatisticResponse | undefined>(undefined);

  const headerHeight = useTypedSelector(selectLayoutHeaderHeight);
  const authorId = useTypedSelector(selectAuthorPostsByUserId);

  useEffect(() => {
    if (authorId) {
      getAuthorStatistic({ authorId }).then((res) => setStatistics(res));
    }
  }, [authorId]);

  const StatisticsWrap = () => (
    <>
      <h2 className="text-center">General statistics</h2>
      <div className="flex flex-row flex-wrap justify-center child:justify-center child:w-fit xl:flex-col xl:child:justify-start xl:child:w-full gap-4">
        <ColorItem>Posts published: {statistics?.posts}</ColorItem>
        <ColorItem>Views: {statistics?.views}</ColorItem>
        <ColorItem>Likes: {statistics?.likes}</ColorItem>
        <ColorItem>Favorite: {statistics?.favorites}</ColorItem>
      </div>
    </>
  );

  return (
    <aside>
      <div
        className={`flex xl:sticky xl:min-h-[50vh] min-h-[100px] ${statistics !== undefined ? "" : "h-full"}`}
        style={{ top: `${headerHeight}px` }}
      >
        <Card className="flex flex-col gap-3 p-4 h-full w-full text-lg">
          {statistics !== undefined ? <StatisticsWrap /> : <Spinner size="m" />}
        </Card>
      </div>
    </aside>
  );
};
