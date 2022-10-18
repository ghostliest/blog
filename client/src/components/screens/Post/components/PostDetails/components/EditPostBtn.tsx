import { MouseEvent } from "react";
import { useRouter } from "next/router";
import { Button } from "@ui";
import { PrivateRoutesEnum } from "@constants";
import { useTypedSelector } from "@hooks";
import { selectUserId } from "@store/selectors/user.selector";
import { selectPost } from "@store/selectors/post.selector";

export const EditPostBtn = () => {
  const { user: author } = useTypedSelector(selectPost);
  const userId = useTypedSelector(selectUserId);

  const router = useRouter();

  const handleEditPost = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (author.id === userId) {
      router.push({ pathname: PrivateRoutesEnum.CMS_EDIT_POST, query: { id: router.query.id } });
    } else {
      return;
    }
  };

  return author.id === userId ? (
    <Button className="w-full" onClick={(e) => handleEditPost(e)}>
      Edit Post
    </Button>
  ) : (
    <></>
  );
};
