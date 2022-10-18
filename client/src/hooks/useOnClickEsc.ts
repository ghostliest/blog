import { useEffect } from "react";

export const useOnClickEsc = (checkValue: boolean, handler: () => void) => {
  useEffect(() => {
    const listener = (event: any) => {
      if (event.keyCode === 27) handler();
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [checkValue, handler]);
};
