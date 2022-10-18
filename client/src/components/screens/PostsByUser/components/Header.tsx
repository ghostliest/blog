import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ButtonFollow, Card, ColorItem, Spinner, UserInfo } from "@ui";
import { useActions, useTypedSelector } from "@hooks";
import { dateFormat } from "@utils";
import { followCount, getUser, IFollowCountResponse } from "@services";
import { selectAuthorPostsByUser, selectAuthorPostsByUserId } from "@store/selectors/postsByUser.selector";
import { selectUserId } from "@store/selectors/user.selector";

export const Header = () => (
  <Card className="flex flex-col gap-6 p-6 justify-center min-h-[152px]">
    <Content />
    <Follow />
  </Card>
);

const Content = () => {
  const author = useTypedSelector(selectAuthorPostsByUser);

  const router = useRouter();
  const { setUserPostsByUser } = useActions();

  useEffect(() => {
    if (router.isReady) {
      const authorId = +router.query.id!;
      getUser(authorId).then((res) => setUserPostsByUser(res));
    }
  }, [router.isReady]);

  return author?.id ? (
    <>
      <UserInfo
        user={{ firstname: author?.firstname!, lastname: author?.lastname, id: author?.id }}
        className="!justify-center !self-center"
      />
      <span className="text-center">Joined on {dateFormat(author!.createAt, "DD.MM.YYYY")}</span>
    </>
  ) : (
    <Spinner size="m" />
  );
};

const Follow = () => {
  const [follow, setFollow] = useState<IFollowCountResponse | null>(null);

  const userId = useTypedSelector(selectUserId);
  const authorId = useTypedSelector(selectAuthorPostsByUserId);

  useEffect(() => {
    if (authorId) {
      followCount({ authorId }).then((res) => setFollow(res));
    }
  }, [authorId]);

  const inc = (val: number) => {
    setFollow((p) => ({ ...p!, followers: p?.followers! + val }));
  };

  const FollowItem = ({ children }: { children: ReactNode }) => (
    <ColorItem color="primary" className="!p-0 self-stretch justify-center">
      {children}
    </ColorItem>
  );

  return follow !== null ? (
    <div className="flex flex-row flex-wrap gap-5 self-center items-center justify-center min-h-[40px] child:w-[100px]">
      <FollowItem>Followed: {follow?.followed}</FollowItem>
      <FollowItem>Followers: {follow?.followers}</FollowItem>
      <ButtonFollow authorId={authorId!} userId={userId} onFollow={() => inc(+1)} onUnfollow={() => inc(-1)} />
    </div>
  ) : (
    <Spinner size="s" />
  );
};
