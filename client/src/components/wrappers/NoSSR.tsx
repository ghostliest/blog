import { ReactNode } from "react";
import dynamic from "next/dynamic";

const Component = ({ children }: { children: ReactNode }) => <>{children}</>;

export const NoSSR = dynamic(() => Promise.resolve(Component), {
  ssr: false,
});
