export interface UserInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  user: {
    id?: number;
    firstname: string;
    lastname?: string;
  };
  showOnlyAvatar?: boolean;
  showName?: boolean;
  onClickToPosts?: boolean;
}
