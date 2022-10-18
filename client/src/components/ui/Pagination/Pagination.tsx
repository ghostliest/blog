import { MouseEventHandler } from "react";
import { Button } from "@ui";
import ArrowIcon from "@assets/arrow.svg";
import { PaginationProps } from "./Pagination.props";

export const Pagination = ({ page, lastPage, next, back, className = "" }: PaginationProps) => {
  const ItemBtn = ({ arrow, onClick }: { arrow: "left" | "right"; onClick: MouseEventHandler<HTMLButtonElement> }) => (
    <Button className="justify-center w-full" appearance="light" onClick={onClick}>
      <span>
        <ArrowIcon className={`h-6 w-6 fill-primary-color ${arrow === "left" ? "rotate-90" : "-rotate-90"}`} />
      </span>
    </Button>
  );

  const Pages = () => (
    <div className="flex items-center justify-center w-full bg-white text-primary-color font-medium rounded-md">
      <span>{`${page} of ${lastPage}`}</span>
    </div>
  );

  return (
    <div
      className={`grid gap-8 grid-flow-col grid-cols-[1fr auto 1fr] select-none ${
        lastPage ? "opacity-100" : "opacity-0"
      } ${className}`}
    >
      <ItemBtn arrow="left" onClick={back} />
      <Pages />
      <ItemBtn arrow="right" onClick={next} />
    </div>
  );
};
