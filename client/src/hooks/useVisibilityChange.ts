import { useEffect, useState } from "react";

export function useVisibilityChange() {
  const [isVisible, setVisible] = useState(true);

  useEffect(() => {
    const handle = () => {
      if (document.visibilityState === "visible") {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    document.addEventListener("visibilitychange", handle);

    return () => {
      removeEventListener("visibilitychange", handle);
    };
  }, []);

  return isVisible;
}
