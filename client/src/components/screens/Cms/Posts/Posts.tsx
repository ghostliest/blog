import { useEffect, useLayoutEffect } from "react";
import { Card } from "@ui";
import { useCurrentWidth, useActions } from "@hooks";
import { Labels, Navigation, PaginationWrap, PostDeleteConfirm, PostsList } from "./components";

const sizes = {
  s: 630,
  m: 920,
};

export const Posts = () => {
  const { setPostsWidth } = useActions();

  let width = useCurrentWidth();

  const calcSize = () => {
    if (width <= sizes.s) {
      setPostsWidth("s");
    } else if (width <= sizes.m) {
      setPostsWidth("m");
    } else {
      setPostsWidth("l");
    }
  };

  useLayoutEffect(() => {
    calcSize();
  }, []);

  useEffect(() => {
    calcSize();
  }, [width]);

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <Navigation />
        <Labels />
        <PostsList />
        <PostDeleteConfirm />
      </Card>
      <PaginationWrap />
    </div>
  );
};
