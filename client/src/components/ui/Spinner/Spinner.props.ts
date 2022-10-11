import { CSSProperties } from "react";

export interface SpinnerProps {
  size?: "s" | "m" | "l";
  fullScreen?: boolean;
  className?: string;
  style?: CSSProperties | undefined;
}
