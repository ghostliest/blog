import { useEffect, useState } from "react";
import { Pagination } from "@ui";
import { useActions, useTypedSelector } from "@hooks";
import { scrollTopSmooth } from "@utils";
import { selectCmsPostsCount, selectCmsPostsQuery } from "@store/selectors/cms.selector";

export const PaginationWrap = () => {
  const [lastPage, setLastPage] = useState(0);

  const { page, limit, status } = useTypedSelector(selectCmsPostsQuery);
  const count = useTypedSelector(selectCmsPostsCount);
  const { setPostsQueryPage } = useActions();

  useEffect(() => {
    setLastPage(Math.ceil(count / limit));
    scrollTopSmooth();
  }, [page, limit, status, count]);

  const next = () => {
    page < lastPage && setPostsQueryPage(page + 1);
  };

  const back = () => {
    page > 1 && setPostsQueryPage(page - 1);
  };

  return count > limit ? <Pagination page={page} lastPage={lastPage} next={next} back={back} /> : <></>;
};
