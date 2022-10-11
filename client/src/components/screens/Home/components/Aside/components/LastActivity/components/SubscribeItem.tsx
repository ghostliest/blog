import { PublicRoutesEnum } from "@constants";
import { IDataFollow } from "@services";
import { Item, LinkWrap } from ".";

export const SubscribeItem = (props: { createAt: Date; data: IDataFollow }) => {
  const {
    data: { follower, followed },
    createAt,
  } = props;

  const { POSTS_BY_USER } = PublicRoutesEnum;

  return (
    <Item date={createAt}>
      <LinkWrap href={`${POSTS_BY_USER}/${follower.id}`}>{`${follower.firstname} ${follower.lastname}`}</LinkWrap>
      <span> subscribed to </span>
      <LinkWrap href={`${POSTS_BY_USER}/${followed.id}`}>{`${followed.firstname} ${followed.lastname}`}</LinkWrap>
    </Item>
  );
};
