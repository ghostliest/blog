import { CardProps } from "./Card.props";

export const Card = ({ children, className = "", ...props }: CardProps) => (
  <div className={`bg-white rounded-xl ${className}`} {...props}>
    {children}
  </div>
);
