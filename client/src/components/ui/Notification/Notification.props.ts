import { ReactNode } from "react";

export interface NotificationProps {
  children: ReactNode;
  className?: string;
  visible: boolean;
}
