import { ButtonArrow } from "@ui";
import { useActions, useTypedSelector } from "@hooks";
import { selectLayoutCmsWidth } from "@store/selectors/cms.selector";

export const ToggleResizeBtn = () => {
  const size = useTypedSelector(selectLayoutCmsWidth);
  const { setLayoutCmsWidth } = useActions();

  const toggleResize = () => {
    if (size === "m") setLayoutCmsWidth("l");
    else setLayoutCmsWidth("m");
  };

  return (
    <ButtonArrow
      className="absolute -right-4 top-3"
      onClick={toggleResize}
      appearance="primary"
      direction={size === "m" ? "right" : "left"}
      size="l"
    />
  );
};
