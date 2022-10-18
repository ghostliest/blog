import { useEffect } from "react";
import { batch } from "react-redux";
import { useRouter } from "next/router";
import { useActions, useTypedSelector } from "@hooks";
import { PrivateRoutesEnum } from "@constants";
import { deletePost } from "@services";
import { selectCmsPosts, selectCmsDeletedPost, selectCmsDeletedPostId } from "@store/selectors/cms.selector";
import EditIcon from "@assets/edit.svg";
import TrashIcon from "@assets/trash.svg";

export const ActionBtns = ({ id }: { id: number }) => (
  <div className="flex w-fit flex-wrap flex-col justify-center justify-self-center gap-3">
    <Edit id={id} />
    <Delete id={id} />
  </div>
);

const Delete = ({ id }: { id: number }) => {
  const deletedPost = useTypedSelector(selectCmsDeletedPost);
  const deletedPostId = useTypedSelector(selectCmsDeletedPostId);
  const posts = useTypedSelector(selectCmsPosts);
  const { setDeletePostId, setDeletePost, setCmsPosts } = useActions();

  useEffect(() => {
    if (deletedPost && deletedPostId) {
      deletePost({ id: deletedPostId }).then((res) => {
        if (res?.result) {
          setCmsPosts({ count: posts?.count! - 1, posts: posts!.posts.filter((i) => i.id !== deletedPostId) });
          batch(() => {
            setDeletePostId(null);
            setDeletePost(false);
          });
        }
      });
    }
  }, [deletedPost]);

  const handleDeletePost = () => {
    setDeletePostId(id);
  };

  return (
    <span className="p-2 rounded-full hover:bg-red-100 cursor-pointer" onClick={handleDeletePost}>
      <TrashIcon className="h-5 w-5 fill-red-700" />
    </span>
  );
};

const Edit = ({ id }: { id: number }) => {
  const router = useRouter();

  const handleEditPost = () => {
    router.push({ pathname: PrivateRoutesEnum.CMS_EDIT_POST, query: { id } });
  };

  return (
    <span className="p-2 rounded-full hover:bg-indigo-100 cursor-pointer" onClick={handleEditPost}>
      <EditIcon className="h-5 w-5 fill-indigo-700" />
    </span>
  );
};
