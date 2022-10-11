export interface CategoryProps extends React.HTMLAttributes<HTMLDivElement> {
  cId?: number;
  size?: "s" | "m" | "l";
  isActive?: boolean;
  link?: boolean;
  widthFull?: boolean;
}
