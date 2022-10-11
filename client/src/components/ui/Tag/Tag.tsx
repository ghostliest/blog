import Link from "next/link";
import cn from "classnames";
import { PublicRoutesEnum } from "@constants";
import { TagsProps } from "./Tag.props";
import styles from "./Tag.module.scss";

export const Tag = (props: TagsProps) => {
  const { tId, size = "s", isActive = true, children, className, onClick } = props;

  const Item = () => (
    <span
      className={cn(styles.btn, {
        [styles.active]: isActive,
        [styles.notActive]: !isActive,
        [styles.s]: size === "s",
        [styles.m]: size === "m",
        [styles.l]: size === "l",
      })}
    >
      {children}
    </span>
  );

  const LinkItem = () => (
    <Link href={`${PublicRoutesEnum.TAG}/${tId}`}>
      <a>
        <Item />
      </a>
    </Link>
  );

  return (
    <div className={className} onClick={onClick}>
      {tId ? <LinkItem /> : <Item />}
    </div>
  );
};
