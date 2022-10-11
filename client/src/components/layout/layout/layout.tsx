import { ReactNode } from "react";
import { Header } from "@layout";

export const Layout = ({ children }: { children: ReactNode }) => (
  <>
    <Header />
    <main className="pl-4">{children}</main>
  </>
);
