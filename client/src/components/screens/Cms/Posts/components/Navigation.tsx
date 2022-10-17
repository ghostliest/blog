import { useEffect, useLayoutEffect, useState } from "react";
import { batch } from "react-redux";
import { Button } from "@ui";
import { getCountUserPosts } from "@services";
import { useActions, useTypedSelector } from "@hooks";
import { selectCmsPostsCount, selectCmsPostsQueryStatus, selectCmsPostsWidth } from "@store/selectors/cms.selector";
import { INav } from "../nav.interface";

export const Navigation = () => {
  const [nav, setNav] = useState<INav[]>([
    { header: "All", type: "ALL", count: 0, active: false },
    { header: "Published", type: "ACTIVE", count: 0, active: false },
    { header: "Draft", type: "DRAFT", count: 0, active: false },
    { header: "blocked", type: "BLOCKED", count: 0, active: false },
  ]);

  const type = useTypedSelector(selectCmsPostsQueryStatus);
  const size = useTypedSelector(selectCmsPostsWidth);
  const postsCount = useTypedSelector(selectCmsPostsCount);
  const { setPostsQueryStatus, setPostsQueryPage } = useActions();

  const findIdxByType = () => nav.findIndex((el) => el.type === type);

  const getCount = () => {
    getCountUserPosts().then((res) => {
      setNav((p) => [
        ...p.map((el) =>
          el.type !== "ALL"
            ? { ...el, count: (res as any)[el.type] || 0 }
            : {
                ...el,
                count: Object.values(res).reduce((sum, cur) => sum + cur, 0),
              }
        ),
      ]);
    });
  };

  useLayoutEffect(() => {
    const idx = findIdxByType();
    setNav((p) => [...p.slice(0, idx), { ...p[idx], active: true }, ...p.slice(idx + 1)]);
    getCount();
  }, []);

  useEffect(() => {
    const idx = findIdxByType();
    if (nav[idx].count > postsCount) {
      getCount();
    }
  }, [postsCount]);

  const handleActiveStatus = (idx: number) => {
    const isActive = nav[idx].active;

    if (isActive) return;
    setNav((p) => [...p.map((el, curIdx) => ({ ...el, active: idx === curIdx ? true : false }))]);
    batch(() => {
      setPostsQueryStatus(nav[idx].type);
      setPostsQueryPage(1);
    });
  };

  return (
    <div>
      <div className={`flex p-4 border-b ${size === "s" ? "gap-1" : "gap-4"}`}>
        {nav.map(({ header, count, active }, idx) => (
          <Button
            key={idx}
            appearance={`${active ? "primary" : "transparent"}`}
            onClick={() => handleActiveStatus(idx)}
            className={`w-full justify-center !px-1`}
          >
            <div className="flex gap-1">
              <span>{header}</span>
              <span>({count})</span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};
