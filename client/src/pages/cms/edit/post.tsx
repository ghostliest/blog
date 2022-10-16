import { ReactElement } from "react";
import { LayoutCms } from "@layout";
import { CreatePost } from "@screens";
import { NoSSR } from "@wrappers";

const EditPostPage = () => <CreatePost />;

EditPostPage.getLayout = (page: ReactElement) => (
  <NoSSR>
    <LayoutCms>{page}</LayoutCms>
  </NoSSR>
);

export default EditPostPage;
