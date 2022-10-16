import { Notification } from "@ui";
import { useTypedSelector } from "@hooks";
import { selectCreatedPost } from "@store/selectors/cms.selector";
import DoneIcon from "@assets/done.svg";

export const PostCreatedNotification = ({ type }: { type: "CREATRED" | "UPDATED" }) => {
  const { showSuccessNotification } = useTypedSelector(selectCreatedPost);

  return (
    <Notification visible={showSuccessNotification}>
      <span>{<DoneIcon />}</span>
      <span>{type === "CREATRED" ? "Post was created" : "Post was updated"}</span>
    </Notification>
  );
};
