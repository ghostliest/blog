import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Spinner } from "@ui";
import { useTypedSelector } from "@hooks";
import { nextRoute } from "@utils";
import { PublicRoutesEnum } from "@constants";
import { createOrDeleteFollow, followCheck } from "@services";
import { selectIsAuth } from "@store/selectors/user.selector";
import { ButtonFollowProps } from "./ButtonFollow.props";

export const ButtonFollow = (props: ButtonFollowProps) => {
  const { authorId, userId, onFollow = () => {}, onUnfollow = () => {}, className = "" } = props;

  const [isFollow, setIsFollow] = useState<boolean | undefined | null>(undefined);

  const isAuth = useTypedSelector(selectIsAuth);

  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      if (authorId !== userId) {
        if (isAuth) {
          followCheck({ followedId: authorId }).then((res) => setIsFollow(res.follow));
        } else if (isAuth === false) {
          setIsFollow(false);
        }
      } else {
        setIsFollow(null);
      }
    }
  }, [router.isReady, isAuth]);

  const handleFollow = () => {
    if (!isAuth) {
      router.push(nextRoute(PublicRoutesEnum.SIGNIN, router.asPath));
    } else {
      setIsFollow(undefined);
      createOrDeleteFollow({ followedId: authorId }).then(({ result }) => {
        if (result === "create") {
          setIsFollow(true);
          onFollow();
        } else if (result === "destroy") {
          setIsFollow(false);
          onUnfollow();
        }
      });
    }
  };

  return isFollow !== null ? (
    <Button onClick={handleFollow} className={className}>
      {isFollow === undefined ? <Spinner size="s" /> : isFollow ? "Unfollow" : "Follow"}
    </Button>
  ) : (
    <></>
  );
};
