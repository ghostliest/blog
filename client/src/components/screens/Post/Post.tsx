import { Article, Reactions, RightSide } from "./components";

export const Post = () => (
  <div className="max-w-7xl m-auto grid md:grid-cols-[1fr_auto] grid-rows-1 gap-4 p-0 sm:px-4 pb-14 md:pb-8">
    <Reactions />
    <div className="grid lg:grid-flow-col lg:grid-cols-[3fr_1.5fr] gap-4 grid-flow-row">
      <Article />
      <RightSide />
    </div>
  </div>
);
