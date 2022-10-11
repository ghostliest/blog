import React from "react";
import Link from "next/link";
import cn from "classnames";
import ArrowIcon from "@assets/arrow.svg";
import styles from "./ButtonArrow.module.scss";
import { ButtonProps } from "./ButtonArrow.props";

export const ButtonArrow = ({
  href,
  appearance = "primary",
  direction,
  size = "s",
  className,
  onClick,
  ...props
}: ButtonProps) => {
  const Btn = () => (
    <button
      className={cn(
        "rounded-full flex gap-1 items-center self-center justify-center cursor-pointer select-none",
        styles.btn,
        className,
        {
          [styles.primary]: appearance == "primary",
          [styles.ghost]: appearance == "ghost",
          [styles.border]: appearance == "border",
          [styles.transparent]: appearance == "transparent",
          [styles.disable]: appearance == "disable",
          [styles.white]: appearance == "white",
          [styles.top]: direction == "top",
          [styles.right]: direction == "right",
          [styles.left]: direction == "left",
          [styles.down]: direction == "down",
          [styles.s]: size === "s",
          [styles.m]: size === "m",
          [styles.l]: size === "l",
          [styles.xl]: size === "xl",
        }
      )}
      onClick={onClick}
      {...props}
    >
      <ArrowIcon />
    </button>
  );

  const LinkBtn = () => (
    <Link href={href!}>
      <a>
        <Btn />
      </a>
    </Link>
  );

  return href !== undefined ? <LinkBtn /> : <Btn />;
};
