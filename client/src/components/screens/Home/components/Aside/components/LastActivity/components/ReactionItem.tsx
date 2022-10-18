import { PublicRoutesEnum } from "@constants";
import { ActivityType, IDataReaction } from "@services";
import { Item, LinkWrap } from ".";

interface ReactionItemProps {
  createAt: Date;
  data: IDataReaction;
  type: ActivityType;
}

export const ReactionItem = (props: ReactionItemProps) => {
  const {
    data: { post, user },
    createAt,
    type,
  } = props;

  const { POSTS_BY_USER, POST } = PublicRoutesEnum;

  return (
    <Item date={createAt}>
      <LinkWrap href={`${POSTS_BY_USER}/${user.id}`}>{`${user.firstname} ${user.lastname}`}</LinkWrap>
      <span>{type === "favorite" ? " added to favorites " : " liked "}</span>
      <LinkWrap href={`${POST}/${post.id}`}>{`${post.title}`}</LinkWrap>
    </Item>
  );
};
