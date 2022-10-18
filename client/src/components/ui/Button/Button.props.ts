import { UrlObject } from "url";

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  href?: string | UrlObject;
  appearance?:
    | "primary"
    | "primaryActive"
    | "ghost"
    | "light"
    | "transparent"
    | "outline"
    | "outlineHoverRed"
    | "disable"
    | "none";
}
