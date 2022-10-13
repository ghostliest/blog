import { Header, PaginationWrap, Posts, Statistics } from "./components";

export const PostsByUser = () => (
  <div className="max-w-7xl m-auto flex flex-col gap-6 pb-8">
    <Header />
    <div className="grid gap-6 lg:grid-rows-[auto_6fr] xl:grid-cols-[1.3fr_6fr] xl:grid-rows-none">
      <Statistics />
      <Posts />
    </div>
    <PaginationWrap />
  </div>
);
