import { UserInfo } from "@ui";
import { useTypedSelector } from "@hooks";
import { selectCmsLayoutCmsWidth } from "@store/selectors/cms.selector";
import { selectUser } from "@store/selectors/user.selector";

export const UserInfoWrap = () => {
  const user = useTypedSelector(selectUser);
  const size = useTypedSelector(selectCmsLayoutCmsWidth);

  return (
    <div className="fixed bottom-0 mb-4">
      <UserInfo showOnlyAvatar={size === "m"} user={{ firstname: user?.email?.split("@")[0] || "" }}>
        {user?.email}
      </UserInfo>
    </div>
  );
};
