import { useState, useEffect } from "react";

const getWidth = () => {
  return typeof window !== "undefined"
    ? window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    : 0;
};

export const useCurrentWidth = () => {
  const [width, setWidth] = useState(getWidth());

  useEffect(() => {
    let timeoutId: any = null;
    const resizeListener = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setWidth(getWidth()), 50);
    };
    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  return width;
};
