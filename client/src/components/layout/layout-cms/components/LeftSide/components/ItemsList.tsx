import { useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@ui";
import { useTypedSelector } from "@hooks";
import { selectLayoutCmsWidth } from "@store/selectors/cms.selector";
import { sideItems } from "../sideItems";
import { Divider } from ".";

export const ItemsList = () => {
  const [curentItemIdx, setCurentItemIdx] = useState(0);

  const size = useTypedSelector(selectLayoutCmsWidth);

  const { pathname, push } = useRouter();

  const handleSelectNavItem = () => {
    const params = pathname.split("/");
    const idx = sideItems.findIndex((el) => {
      const itemParam = el.link.split("/");
      return itemParam.at(-1) === params.at(-1);
    });
    setCurentItemIdx(idx);
  };

  useLayoutEffect(() => {
    handleSelectNavItem();
  }, [pathname]);

  const choiceItem = (idx: number, link: string) => {
    if (curentItemIdx !== idx) {
      setCurentItemIdx(idx);
      push(link);
    }
  };

  return (
    <nav className="flex flex-col gap-8">
      <ul className={`flex flex-col gap-1 w-full ${size === "m" && "items-center"}`}>
        {sideItems.map(({ id, header, link, icon: Icon }, idx) => (
          <li key={id} className="w-full h-full">
            {!header ? (
              <Divider />
            ) : (
              <Button
                appearance={`${curentItemIdx === idx ? "primaryActive" : "transparent"}`}
                className={`!p-4 w-full group ${size === "m" ? "!p-0 w-[44px] h-[44px]" : "!justify-start"}`}
                onClick={() => choiceItem(idx, link)}
              >
                <span>{size !== "m" ? header : <Icon className="fill-primary-color h-6 w-6" />}</span>
              </Button>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
