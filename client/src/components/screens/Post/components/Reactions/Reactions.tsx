import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { addOrDeleteReactions, getReacions, IReactionsResponse, ReactionsCategoryType } from "@services";
import { PublicRoutesEnum } from "@constants";
import { useCurrentWidth, useTypedSelector } from "@hooks";
import { nextRoute } from "@utils";
import { selectIsAuth, selectUserId } from "@store/selectors/user.selector";
import { selectPostId } from "@store/selectors/post.selector";
import { selectLayoutHeaderHeight } from "@store/selectors/layout.selector";
import { ReactionLike, ReactionReading } from "./components";

export const Reactions = () => {
  const [reactions, setReactions] = useState<IReactionsResponse>({
    like: { count: 0, thisUser: undefined },
    readingList: { count: 0, thisUser: undefined },
  });

  const userId = useTypedSelector(selectUserId);
  const postId = useTypedSelector(selectPostId);
  const isAuth = useTypedSelector(selectIsAuth);
  const headerHeight = useTypedSelector(selectLayoutHeaderHeight);

  const router = useRouter();

  let width = useCurrentWidth();

  useEffect(() => {
    if (isAuth !== null && postId) {
      getReacions({ postId, userId }).then((res) => {
        setReactions(res);
      });
    }
  }, [isAuth, postId]);

  const handleReaction = (type: ReactionsCategoryType) => {
    if (isAuth && postId) {
      addOrDeleteReactions({ category: type, postId }).then(({ category, result }) => {
        if (category === "like" || category === "readingList") {
          setReactions((p) => ({
            ...p,
            [category]: {
              ...p[category],
              count: result === "create" ? p[category].count + 1 : p[category].count - 1,
              thisUser: result === "create" ? true : false,
            },
          }));
        }
      });
    } else {
      router.push(nextRoute(PublicRoutesEnum.SIGNIN, router.asPath));
    }
  };

  return (
    <aside>
      <div
        className={`fixed left-0 bottom-0 w-full md:h-40 md:w-8 md:sticky border-t border-border-color md:border-0 z-10`}
        style={width >= 768 ? { top: `${headerHeight}px` } : undefined}
      >
        <div className="flex md:flex-col bg-white justify-evenly md:bg-transparent flex-row gap-5 py-1 md:p-0">
          <ReactionLike reaction={reactions.like} onClick={handleReaction} />
          <ReactionReading reaction={reactions.readingList} onClick={handleReaction} />
        </div>
      </div>
    </aside>
  );
};
