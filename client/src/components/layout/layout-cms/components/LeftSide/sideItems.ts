import { PrivateRoutesEnum } from "@constants";
import AddIcon from "@assets/add.svg";
import DashboardIcon from "@assets/dashboard.svg";
import ProfileIcon from "@assets/profile.svg";
import PostIcon from "@assets/post.svg";

export const sideItems = [
  {
    id: 1,
    header: "Dashboard",
    icon: DashboardIcon,
    params: "dashboard",
    link: PrivateRoutesEnum.CMS_DASHBOARD,
  },
  {
    id: 2,
    header: "Profile",
    icon: ProfileIcon,
    params: "profile",
    link: PrivateRoutesEnum.CMS_PROFILE,
  },
  {
    id: 3,
    header: "Posts",
    icon: PostIcon,
    params: "posts",
    link: PrivateRoutesEnum.CMS_POSTS,
  },
  { id: 4, header: "", icon: "", params: "", link: "" },
  {
    id: 5,
    header: "Сreate post",
    icon: AddIcon,
    link: PrivateRoutesEnum.CMS_CREATE_POST,
  },
];
