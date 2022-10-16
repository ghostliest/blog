import { ReactElement } from "react";
import { LayoutCms } from "@layout";
import { CreatePost } from "@screens";
import { NoSSR } from "@wrappers";

const CreatePostPage = () => <CreatePost />;

CreatePostPage.getLayout = (page: ReactElement) => (
  <NoSSR>
    <LayoutCms>{page}</LayoutCms>
  </NoSSR>
);

export default CreatePostPage;
