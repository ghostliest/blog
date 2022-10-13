import { Views } from "@ui";
import { LinkToPost } from "./LinkToPost";

export const Bottom = ({ postId, title, views }: { postId: number; title: string; views: number }) => (
  <LinkToPost id={postId}>
    <div className="absolute bottom-0 left-0 p-1 flex flex-row justify-around w-full items-center backdrop-blur-md rounded-b-xl z-10">
      <span className="text-white font-bold">{title}</span>
      <Views appearance="light" views={views} />
    </div>
  </LinkToPost>
);
