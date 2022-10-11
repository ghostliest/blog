import { ReactNode } from "react";
import Link from "next/link";
import { PublicRoutesEnum } from "@constants";

export const LinkToPost = ({ children, id }: { children: ReactNode; id: number }) => (
  <Link href={`${PublicRoutesEnum.POST}/${id}`}>
    <a className="w-full h-full relative">{children}</a>
  </Link>
);
