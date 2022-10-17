import { useEffect, useState } from "react";
import { Spinner } from "@ui";
import { getAllUserPosts } from "@services";
import { useActions, useTypedSelector } from "@hooks";
import { selectCmsPostsQuery } from "@store/selectors/cms.selector";
import { Posts } from "./components";

export const PostsList = () => {
  const { page, limit, status } = useTypedSelector(selectCmsPostsQuery);
  const { setCmsPosts } = useActions();

  const [isLoaded, setIsLoaded] = useState(false);

  const getUserPosts = () => {
    setIsLoaded(false);
    getAllUserPosts({
      page,
      limit,
      status: status === "ALL" ? undefined : status,
    }).then((posts) => {
      setCmsPosts(posts);
      setIsLoaded(true);
    });
  };

  useEffect(() => {
    getUserPosts();
  }, [page, limit, status]);

  return <div>{isLoaded ? <Posts /> : <Spinner size="m" className="flex justify-center py-40 text-2xl" />}</div>;
};
