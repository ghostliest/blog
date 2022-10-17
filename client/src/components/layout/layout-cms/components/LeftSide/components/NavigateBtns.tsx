import { useRouter } from "next/router";
import { Button, ButtonArrow } from "@ui";
import { PublicRoutesEnum } from "@constants";
import { selectCmsLayoutCmsWidth } from "@store/selectors/cms.selector";
import { useTypedSelector } from "@hooks";
import HomeIcon from "@assets/home.svg";

export const NavigateBtns = () => {
  const size = useTypedSelector(selectCmsLayoutCmsWidth);

  const { back } = useRouter();

  return (
    <div className={`flex justify-center items-center gap-4 ${size === "m" ? "flex-col" : "flex-row"}`}>
      <ButtonArrow onClick={back} appearance="ghost" direction="left" size="xl" />
      <Button href={PublicRoutesEnum.HOME} appearance="ghost" className={`${size === "m" && "!p-0 w-[44px] h-[44px]"} group`}>
        {size === "m" ? <HomeIcon className="w-6 h-6 fill-primary-color group-hover:fill-white" /> : <span>HOME</span>}
      </Button>
    </div>
  );
};
