import cn from "classnames";
import SpinnerIcon from "@assets/spinner.svg";
import { SpinnerProps } from "./Spinner.props";
import styles from "./Spinner.module.scss";

export const Spinner = ({ fullScreen = false, className = "", style, size = "s" }: SpinnerProps) => {
  return (
    <div className={cn(styles.spinnerWrapper, className)} style={{ ...style }}>
      <div className={cn(styles.spinnerContainer, { [styles.spinnerFullscreen]: fullScreen })}>
        <div className={cn(styles.spinner)}>
          <SpinnerIcon className={size === "s" ? "scale-[1]" : size === "m" ? "scale-[3]" : "scale-[6]"} />
        </div>
      </div>
    </div>
  );
};
