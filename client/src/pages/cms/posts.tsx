import { ReactElement } from "react";
import { LayoutCms } from "@layout";
import { Posts } from "@screens";
import { NoSSR } from "@wrappers";

const PostsPage = () => <Posts />;

PostsPage.getLayout = (page: ReactElement) => (
  <NoSSR>
    <LayoutCms>{page}</LayoutCms>
  </NoSSR>
);

export default PostsPage;
