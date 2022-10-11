import { useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";
import cn from "classnames";
import { Button } from "@ui";
import { useActions, useTypedSelector } from "@hooks";
import { orderByType, sortType } from "@services";
import { selectHomeQueryFilter } from "@store/selectors/pages.selector";
import ArrowIcon from "@assets/arrow.svg";
import styles from "./Filter.module.scss";

export const Filter = () => {
  const [sortBy, setSortBy] = useState<{ id: number; sort: sortType; orderBy: orderByType }[]>([
    { id: 1, sort: "date", orderBy: "desc" },
    { id: 2, sort: "popular", orderBy: "desc" },
    { id: 3, sort: "views", orderBy: "desc" },
  ]);

  const [selectedIdx, setSelectedIdx] = useState(0);
  const [renderReady, setRenderReady] = useState(false);

  const { sort, orderBy } = useTypedSelector(selectHomeQueryFilter);
  const { setHomeQueryFilter, setHomeQueryFilterOrderBy } = useActions();

  const router = useRouter();

  const getFilterFromQuery = () => {
    return {
      sort: router.query.sort as sortType,
      orderBy: router.query.orderBy as orderByType,
    };
  };

  const pushQuery = (query: { sort?: sortType; orderBy?: orderByType }) => {
    router.push({ query: { ...router.query, page: 1, ...query } });
  };

  const computeIdx = (sortType: sortType) => {
    return sortBy.findIndex((el) => el.sort === sortType);
  };

  const switchOrderBy = (idx: number, orderBy?: orderByType) => {
    const choiceOrder = () => {
      if (orderBy) return orderBy;
      else return sortBy[idx].orderBy === "asc" ? "desc" : "asc";
    };
    setSortBy((p) => [...p.slice(0, idx), { ...p[idx], orderBy: choiceOrder() }, ...p.slice(idx + 1)]);
  };

  const syncQueryWithState = () => {
    const { sort: querySort, orderBy: queryOrderBy } = getFilterFromQuery();

    if (querySort !== sort || queryOrderBy !== orderBy) {
      setHomeQueryFilter({ sort: querySort, orderBy: queryOrderBy });
      const idx = computeIdx(querySort);
      setSelectedIdx(idx);
      switchOrderBy(idx, queryOrderBy);
    }
  };

  const handleQueryChange = () => {
    const { sort: querySort, orderBy: queryOrderBy } = getFilterFromQuery();
    const { sort: stateSort, orderBy: stateOrderBy } = sortBy[selectedIdx];

    const idx = computeIdx(querySort);

    if (querySort !== stateSort) {
      setHomeQueryFilter({ sort: querySort, orderBy: queryOrderBy });
      setSelectedIdx(idx);
    } else if (queryOrderBy !== stateOrderBy) {
      setHomeQueryFilterOrderBy(queryOrderBy);
      switchOrderBy(idx, queryOrderBy);
    }
  };

  useLayoutEffect(() => {
    syncQueryWithState();
    setRenderReady(true);
  }, []);

  useEffect(() => {
    handleQueryChange();
  }, [router.query.sort, router.query.orderBy]);

  const handleChoiceSort = (idx: number) => {
    if (selectedIdx === idx) {
      const stateOrderBy = sortBy[idx].orderBy;
      pushQuery({ orderBy: stateOrderBy === "asc" ? "desc" : "asc" });
    } else {
      const { sort, orderBy } = sortBy[idx];
      pushQuery({ sort, orderBy });
    }
  };

  const FilterItem = ({ id, idx, type }: { id: number; idx: number; type: sortType }) => (
    <>
      <span>{type[0].toUpperCase() + type.slice(1)}</span>
      <span
        className={cn(styles.sortIcon, {
          [styles.sortIconActive]: sortBy[selectedIdx].id === id,
          [styles.down]: sortBy[idx].orderBy == "desc",
        })}
      >
        {<ArrowIcon />}
      </span>
    </>
  );

  return (
    <div className="flex gap-2 w-full">
      {sortBy.map(({ id, sort: type }, idx) => (
        <Button
          key={id}
          onClick={() => handleChoiceSort(idx)}
          appearance={!renderReady ? "light" : sortBy[selectedIdx].id === id ? "primary" : "light"}
          className={styles.btnSortBy}
        >
          <FilterItem idx={idx} id={id} type={type} />
        </Button>
      ))}
    </div>
  );
};
