export interface ButtonFollowProps {
  authorId: number;
  userId: number | undefined;
  onFollow?: () => void;
  onUnfollow?: () => void;
  className?: string;
}
