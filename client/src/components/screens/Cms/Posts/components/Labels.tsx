import { useTypedSelector } from "@hooks";
import { selectCmsPostsCount, selectCmsPostsWidth } from "@store/selectors/cms.selector";

const labels = ["№", "Title", "Category", "Tags", "Date", "Actions"];

export const Labels = () => {
  const size = useTypedSelector(selectCmsPostsWidth);
  const count = useTypedSelector(selectCmsPostsCount);

  return count ? (
    <div
      className={
        `grid gap-2 lg:gap-4 ${size === "s" ? "px-2 py-4" : "p-4"} ` +
        `${size === "l" ? "grid-cols-[2em_6fr_4fr_4fr_2fr_4em]" : ""}` +
        `${size === "m" || size === "s" ? "grid-cols-[2em_4fr_4fr_4em]" : ""}`
      }
    >
      {size === "l" && labels.map((m) => <div key={m}>{m}</div>)}
      {(size === "m" || size === "s") && labels.filter((f) => f !== "Date" && f !== "Title").map((m) => <div key={m}>{m}</div>)}
    </div>
  ) : (
    <></>
  );
};
