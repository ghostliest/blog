import Link from "next/link";
import cn from "classnames";
import { PublicRoutesEnum } from "@constants";
import { CategoryProps } from "./Category.props";
import styles from "./Category.module.scss";

export const Category = (props: CategoryProps) => {
  const { cId, size = "s", isActive = true, children, className, widthFull, onClick } = props;

  const Item = () => (
    <span
      className={cn(styles.btn, {
        [styles.active]: isActive,
        [styles.notActive]: !isActive,
        [styles.s]: size === "s",
        [styles.m]: size === "m",
        [styles.l]: size === "l",
        [styles.widthFull]: widthFull,
      })}
    >
      {children}
    </span>
  );

  const LinkItem = () => (
    <Link href={`${PublicRoutesEnum.CATEGORY}/${cId}`}>
      <a>
        <Item />
      </a>
    </Link>
  );

  return (
    <div className={className} onClick={onClick}>
      {cId ? <LinkItem /> : <Item />}
    </div>
  );
};
