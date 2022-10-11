import { ReactNode } from "react";
import Link from "next/link";
import { UrlObject } from "url";

interface LinkWrapProps {
  href: UrlObject | string;
  children: ReactNode;
}

export const LinkWrap = ({ href, children }: LinkWrapProps) => (
  <Link href={href}>
    <a className="font-medium">{children}</a>
  </Link>
);
