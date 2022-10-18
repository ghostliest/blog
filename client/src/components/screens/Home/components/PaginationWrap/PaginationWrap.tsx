import { useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";
import { Pagination } from "@ui";
import { useActions, useTypedSelector } from "@hooks";
import { selectPostsCount } from "@store/selectors/home.selector";
import { selectHomeQueryPagination } from "@store/selectors/pages.selector";

export const PaginationWrap = () => {
  const [lastPage, setLastPage] = useState(0);

  const { page, limit } = useTypedSelector(selectHomeQueryPagination);
  const count = useTypedSelector(selectPostsCount);
  const { setHomeQueryPage, setHomeQueryLimit } = useActions();

  const router = useRouter();

  const setPage = (page: number) => {
    router.push({ query: { ...router.query, page } });
    setHomeQueryPage(page);
  };

  const getTagsFromQuery = () => {
    return {
      page: +(router.query.page as string),
      limit: +(router.query.limit as string),
    };
  };

  const syncQueryWithState = () => {
    const { page: queryPage, limit: queryLimit } = getTagsFromQuery();
    if (queryPage !== page) setHomeQueryPage(queryPage);
    if (queryLimit !== limit) setHomeQueryLimit(queryLimit);
  };

  useLayoutEffect(() => {
    syncQueryWithState();
  }, []);

  useEffect(() => {
    syncQueryWithState();
  }, [router.query.page, router.query.limit]);

  useEffect(() => {
    if (count) {
      setLastPage(Math.ceil(count / limit));
    }
  }, [count, limit]);

  const next = () => {
    page < lastPage && setPage(page + 1);
  };

  const back = () => {
    page > 1 && setPage(page - 1);
  };

  return <Pagination page={page} lastPage={lastPage} next={next} back={back} />;
};
