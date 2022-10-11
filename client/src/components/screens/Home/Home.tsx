import { Aside, CategoriesList, Filter, PaginationWrap, PostItemsList, TagsList } from "./components";

export const Home = () => (
  <div className="mb-4 max-w-[95%] 2xl:max-w-screen-2xl m-auto">
    <div className="grid gap-8 grid-rows-[1fr_auto] xl:grid-cols-[2fr_6fr] xl:grid-rows-none">
      <Aside />
      <div className="flex flex-col gap-8">
        <CategoriesList />
        <TagsList />
        <Filter />
        <PostItemsList />
        <PaginationWrap />
      </div>
    </div>
  </div>
);
