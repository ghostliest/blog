import { ReactElement } from "react";
import { PostsByUser } from "@screens";
import { Layout } from "@layout";

const PostsByUserPage = () => <PostsByUser />;

PostsByUserPage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default PostsByUserPage;
