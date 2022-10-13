import { MouseEvent } from "react";
import Link from "next/link";
import cn from "classnames";
import styles from "./Button.module.scss";
import { ButtonProps } from "./Button.props";

export const Button = ({ href, onClick = () => {}, appearance = "primary", children, className = "", ...props }: ButtonProps) => {
  const Btn = () => {
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      if (!href) {
        e.preventDefault();
        onClick(e);
      }
    };

    return (
      <button
        className={cn(
          "px-5 py-2 rounded-lg flex gap-4 justify-center items-center self-center cursor-pointer select-none",
          className,
          styles.btn,
          {
            [styles.primary]: appearance == "primary",
            [styles.primaryActive]: appearance == "primaryActive",
            [styles.ghost]: appearance == "ghost",
            [styles.light]: appearance == "light",
            [styles.outline]: appearance == "outline",
            [styles.outlineHoverRed]: appearance == "outlineHoverRed",
            [styles.transparent]: appearance == "transparent",
            [styles.disable]: appearance == "disable",
          }
        )}
        onClick={(e) => handleClick(e)}
        {...props}
      >
        {children}
      </button>
    );
  };

  const LinkBtn = () => (
    <Link href={href!}>
      <a className="flex w-[inherit]">
        <Btn />
      </a>
    </Link>
  );

  return href !== undefined ? <LinkBtn /> : <Btn />;
};
