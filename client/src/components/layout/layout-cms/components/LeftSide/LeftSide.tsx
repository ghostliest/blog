import { Divider, ItemsList, NavigateBtns, ToggleResizeBtn, UserInfoWrap } from "./components";

export const LeftSide = () => (
  <aside className="bg-white border-r border-b-zinc-200">
    <div className="sticky top-0 p-4 pt-10">
      <ToggleResizeBtn />
      <NavigateBtns />
      <Divider />
      <ItemsList />
      <UserInfoWrap />
    </div>
  </aside>
);
