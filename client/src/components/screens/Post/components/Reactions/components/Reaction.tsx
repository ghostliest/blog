import { IReactionItemResponse, ReactionsCategoryType } from "@services";
import { ReactionItem } from "./ReactionItem";
import HeartIcon from "@assets/heart.svg";
import BookmarkIcon from "@assets/bookmark.svg";

interface ReactionProps {
  reaction: IReactionItemResponse;
  onClick: (type: ReactionsCategoryType) => void;
}

export const ReactionLike = ({ reaction, onClick }: ReactionProps) => (
  <ReactionItem type="like" reaction={reaction} onClick={onClick}>
    <span className="p-2 rounded-full group-hover:bg-[#f2e0e0] transition-all">
      <HeartIcon
        className={`h-6 w-6 group-hover:fill-red-600 transition-all ${reaction.thisUser ? "fill-red-600" : "fill-slate-600"}`}
      />
    </span>
  </ReactionItem>
);

export const ReactionReading = ({ reaction, onClick }: ReactionProps) => (
  <ReactionItem type="readingList" reaction={reaction} onClick={onClick}>
    <span className="p-2 rounded-full group-hover:bg-primary-color-hover transition-all">
      <BookmarkIcon
        className={`h-6 w-6 group-hover:fill-primary-color transition-all ${
          reaction.thisUser ? "fill-primary-color" : "fill-slate-600"
        }`}
      />
    </span>
  </ReactionItem>
);
