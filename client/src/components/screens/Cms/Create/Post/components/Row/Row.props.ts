import { ReactNode } from "react";

export interface RowProps {
  header: string;
  annotation?: string;
  children: ReactNode;
  message?: string;
  col?: boolean;
}
