import { Card } from "@ui";
import cn from "classnames";
import styles from "./Notification.module.scss";
import { NotificationProps } from "./Notification.props";

export const Notification = ({ children, className, visible }: NotificationProps) => {
  return (
    <Card
      className={cn(
        className,
        {
          [styles.fadeIn]: visible,
          [styles.fadeOut]: !visible,
        },
        "fixed bottom-4 right-4 bg-[#e8effe4a] backdrop-blur-2xl px-24 py-12 z-50 transition-opacity duration-400 ease-in-out"
      )}
    >
      <div className="text-primary-color flex gap-4 h-full items-center justify-center font-bold">{children}</div>
    </Card>
  );
};
