import { ButtonFollow, UserInfo } from "@ui";
import { useTypedSelector } from "@hooks";
import { selectPost } from "@store/selectors/post.selector";
import { selectUserId } from "@store/selectors/user.selector";

export const Author = () => {
  const { user: author } = useTypedSelector(selectPost);
  const userId = useTypedSelector(selectUserId);

  return (
    <div className="flex items-center justify-center gap-1">
      <UserInfo user={author} onClickToPosts={true} />
      <ButtonFollow authorId={author?.id} userId={userId} className="w-[150px]" />
    </div>
  );
};
