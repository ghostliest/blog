import cn from "classnames";
import { ColorItemProps } from "./ColorItem.props";
import styles from "./ColorItem.module.scss";

export const ColorItem = ({ children, color = "green", className = "", ...props }: ColorItemProps) => (
  <span
    className={cn(`flex items-center justify-start w-full rounded-lg py-1 px-3`, className, {
      [styles.green]: color === "green",
      [styles.yellow]: color === "yellow",
      [styles.primary]: color === "primary",
    })}
    {...props}
  >
    {children}
  </span>
);
