import { UrlObject } from "url";

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  href?: string | UrlObject;
  appearance?: "primary" | "ghost" | "transparent" | "border" | "disable" | "white";
  direction: "top" | "right" | "down" | "left";
  size?: "s" | "m" | "l" | "xl";
}
