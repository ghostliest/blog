import { ReactNode, useLayoutEffect } from "react";
import { useActions, useCurrentWidth, useTypedSelector } from "@hooks";
import { selectCmsLayoutCmsWidth } from "@store/selectors/cms.selector";
import { LeftSide } from "./components";

const sizes = {
  m: 1180,
};

export const LayoutCms = ({ children }: { children: ReactNode }) => {
  const size = useTypedSelector(selectCmsLayoutCmsWidth);
  const { setLayoutCmsWidth } = useActions();

  let width = useCurrentWidth();

  useLayoutEffect(() => {
    if (width <= sizes.m) {
      size !== "m" && setLayoutCmsWidth("m");
    } else {
      size !== "l" && setLayoutCmsWidth("l");
    }
  }, [width]);

  return (
    <div className={`grid gap-4 text-base h-screen ${size === "m" ? "grid-cols-[75px_1fr_1fr_1fr_1fr_1fr]" : "grid-cols-6"}`}>
      <LeftSide />
      <main className="col-start-2 col-span-5 mt-8 mb-8">{children}</main>
    </div>
  );
};
