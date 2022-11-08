import { useEffect, useState } from "react";
import { useActions, useTypedSelector } from "@hooks";
import { selectCountPostsByUser, selectQueryPostsByUser } from "@store/selectors/postsByUser.selector";
import { Pagination } from "@ui";

export const PaginationWrap = () => {
  const [lastPage, setLastPage] = useState(0);

  const count = useTypedSelector(selectCountPostsByUser);
  const query = useTypedSelector(selectQueryPostsByUser);
  const { setPostsByUserQuery } = useActions();

  useEffect(() => {
    setLastPage(Math.ceil(count / query.limit));
  }, [query, count]);

  const next = () => {
    setPostsByUserQuery({ ...query, page: query.page + 1 });
  };

  const back = () => {
    setPostsByUserQuery({ ...query, page: query.page - 1 });
  };

  return <Pagination page={query.page} lastPage={lastPage} next={next} back={back} />;
};
