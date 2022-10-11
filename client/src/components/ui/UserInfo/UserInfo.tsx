import React from "react";
import Link from "next/link";
import { PublicRoutesEnum } from "@constants";
import { useTypedSelector } from "@hooks";
import { selectUserId } from "@store/selectors/user.selector";
import { UserInfoProps } from "./UserInfo.props";

export const UserInfo = (props: UserInfoProps) => {
  const {
    user: { id, firstname, lastname = "" },
    children,
    showOnlyAvatar = false,
    showName = true,
    onClickToPosts = false,
    className = "",
  } = props;

  const userId = useTypedSelector(selectUserId);

  const Avatar = () => (
    <div className="flex items-center justify-center rounded-full p-5 h-10 w-10 bg-indigo-100 font-medium text-indigo-800">
      {(firstname[0] + (lastname ? lastname[0] : "")).toUpperCase()}
    </div>
  );

  const Info = () => (
    <div className={`flex gap-2 p-1 rounded-sm items-center ${className}`}>
      <Avatar />
      {!showOnlyAvatar && (
        <div className="flex flex-col w-full">
          {showName && (
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {`${firstname} ${lastname} ${id === userId ? "(you)" : ""}`}
            </span>
          )}
          <div className="flex space-x-1 text-sm text-gray-500 dark:text-gray-400">{children}</div>
        </div>
      )}
    </div>
  );

  const InfoWithLink = () => (
    <Link href={{ pathname: PublicRoutesEnum.POSTS_BY_USER + `/${id}` }}>
      <a className="w-full rounded-md hover:bg-slate-50 transition-all">
        <Info />
      </a>
    </Link>
  );

  return onClickToPosts ? <InfoWithLink /> : <Info />;
};
