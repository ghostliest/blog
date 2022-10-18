import { useEffect, useRef, useState } from "react";
import { AuthorsStatisticType, getAuthorsStatistic, IGetAuthorsStatisticResponse } from "@services";
import { useActions } from "@hooks";
import { Header, Labels, Items } from "./components";

const navigate: { label: string; type: AuthorsStatisticType }[] = [
  { label: "Day", type: "day" },
  { label: "Week", type: "week" },
  { label: "Month", type: "month" },
];

export const AuthorsTop = () => {
  const [statistics, setStatistics] = useState<IGetAuthorsStatisticResponse[] | null>(null);
  const [navigateIdx, setNavigateIdx] = useState(2);
  const [componentHeight, setComponentHeight] = useState(150);

  const itemsRef = useRef(null) as { current: any };
  const componentRef = useRef(null) as { current: any };

  const { setLayoutAuthorTop } = useActions();

  const getAuthorsStatisticWrap = () => {
    console.log("getAuthorsStatisticWrap");
    const sort = navigate[navigateIdx].type;
    getAuthorsStatistic({ sort }).then((res) => setStatistics(res));
  };

  useEffect(() => {
    getAuthorsStatisticWrap();
  }, [navigateIdx]);

  useEffect(() => {
    if (statistics?.length) {
      setComponentHeight(itemsRef?.current?.getBoundingClientRect().height);
      setLayoutAuthorTop({ height: componentRef?.current?.getBoundingClientRect().height });
    }
  }, [statistics]);

  return (
    <div className="flex flex-col h-fit xl:pr-4 pr-0" ref={componentRef}>
      <h2 className="text-center pb-4">AUTHORS TOP</h2>
      <div className="flex justify-center items-center transition-all duration-500">
        <div className="flex flex-col gap-4 w-full">
          <Header navigate={navigate} navigateIdx={navigateIdx} setNavigateIdx={setNavigateIdx} setStatistics={setStatistics} />
          <Labels statisticsLength={statistics?.length || null} />
          <Items statistics={statistics} componentHeight={componentHeight} />
        </div>
      </div>
    </div>
  );
};
