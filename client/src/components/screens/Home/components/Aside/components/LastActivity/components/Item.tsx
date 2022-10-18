import { ReactNode } from "react";
import { Card } from "@ui";
import { formatTimeAgo } from "@utils";

interface ItemProps {
  children: ReactNode;
  date: Date;
}

export const Item = ({ children, date }: ItemProps) => (
  <Card className="relative bg-slate-100 px-3 pt-3 pb-6 flex flex-col gap-1">
    <div>
      {children}
      <div className="absolute bottom-0 right-2 text-sm leading-6 text-slate-400">{formatTimeAgo(date)}</div>
    </div>
  </Card>
);
