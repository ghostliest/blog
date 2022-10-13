import { Card } from "@ui";
import { Author, CategoryWrap, Date, EditPostBtn, ViewsWrap } from "./components";

export const PostDetails = () => (
  <div className="flex flex-col gap-3">
    <Card>
      <div className="p-4 flex flex-col gap-3">
        <Author />
        <CategoryWrap />
        <Date />
        <ViewsWrap />
      </div>
    </Card>
    <EditPostBtn />
  </div>
);
