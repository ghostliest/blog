import { UserInfo, Views } from "@ui";
import { IGetOnePostUser } from "@services";
import { dateFormat } from "@utils";

interface AuthorProps {
  showAuthor: boolean;
  user: IGetOnePostUser;
  views: number;
  createAt: string;
}

export const Author = ({ showAuthor, user, views, createAt }: AuthorProps) => (
  <div className={`flex items-center justify-between gap-8 ${!showAuthor ? "!justify-end" : "mt-6"}`}>
    {showAuthor ? (
      <UserInfo user={user} onClickToPosts={true} className="w-full">
        <div>{dateFormat(createAt)}</div>
      </UserInfo>
    ) : (
      <></>
    )}
    <Views appearance="dark" views={views} />
  </div>
);
