import { ButtonArrow } from "@ui";

interface CollapseBtnProps {
  isCollapsed: boolean;
  show: boolean;
  onClick: () => void;
}

export const CollapseBtn = ({ show, isCollapsed, onClick }: CollapseBtnProps) => {
  return show ? (
    <ButtonArrow direction={isCollapsed ? "down" : "top"} size="l" appearance="white" onClick={onClick} className="!self-start" />
  ) : (
    <></>
  );
};
