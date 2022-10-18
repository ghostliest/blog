import { useRef } from "react";
import { Button, Notification } from "@ui";
import { useActions, useTypedSelector, useOnClickOutside, useOnClickEsc } from "@hooks";
import { selectCmsDeletedPostId } from "@store/selectors/cms.selector";

export const PostDeleteConfirm = () => {
  const deletedPostId = useTypedSelector(selectCmsDeletedPostId);
  const { setDeletePost, setDeletePostId } = useActions();

  const ref = useRef() as any;

  const handleDeletePost = () => {
    setDeletePost(true);
  };

  const handleCancelDelete = () => {
    setDeletePostId(null);
  };

  useOnClickOutside(ref, handleCancelDelete);
  useOnClickEsc(!!deletedPostId, handleCancelDelete);

  const GroupBtns = () => (
    <div className="flex justify-evenly">
      <Button appearance={"primary"} onClick={handleDeletePost}>
        Yes
      </Button>
      <Button appearance={"primary"} onClick={handleCancelDelete}>
        No
      </Button>
    </div>
  );

  return (
    <div ref={ref}>
      <Notification visible={!!deletedPostId}>
        <div className="flex flex-col gap-8">
          <span>Are you sure you want to delete this post?</span>
          <GroupBtns />
        </div>
      </Notification>
    </div>
  );
};
