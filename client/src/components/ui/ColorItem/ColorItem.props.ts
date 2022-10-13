import { HTMLAttributes } from "react";

export interface ColorItemProps extends HTMLAttributes<HTMLButtonElement> {
  color?: "green" | "yellow" | "primary";
}
