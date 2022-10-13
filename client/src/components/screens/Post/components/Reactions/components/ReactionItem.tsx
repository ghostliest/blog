import { ReactNode } from "react";
import { Button } from "@ui";
import { IReactionItemResponse, ReactionsCategoryType } from "@services";

interface ReactionItemProps {
  children: ReactNode;
  className?: string;
  type: ReactionsCategoryType;
  onClick: (type: ReactionsCategoryType) => void;
  reaction: IReactionItemResponse;
}

export const ReactionItem = (props: ReactionItemProps) => {
  const { children, className = "", type, reaction, onClick } = props;
  const { count, thisUser } = reaction;

  return (
    <Button
      appearance="none"
      className={`flex md:flex-col !md:gap-0 flex-row !gap-1 !p-0 group ${className}`}
      onClick={() => onClick(type)}
    >
      {children}
      <span className={`transition-all duration-700 ${thisUser === undefined ? "opacity-0" : "opacity-100"}`}>{count}</span>
    </Button>
  );
};
