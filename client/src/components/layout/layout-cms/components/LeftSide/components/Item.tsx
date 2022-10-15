// import { Button } from "@ui";

// interface ItemProps {
//   idx: number;
//   curentItemIdx: number;
//   size: "s" | "m" | "l";
//   onClick: (idx: number, link: string) => void;
//   link: string;
//   header: string;
//   Icon: any;
// }

//  const Item = ({ idx, curentItemIdx, size, link, header, Icon, onClick }: ItemProps) => (
//   <Button
//     appearance={`${curentItemIdx === idx ? "primaryActive" : "transparent"}`}
//     className={`!p-4 w-full group ${size === "m" ? "!p-0 w-[44px] h-[44px]" : "!justify-start"}`}
//     onClick={() => onClick(idx, link)}
//   >
//     <span>{size !== "m" ? header : <Icon className="fill-primary-color h-6 w-6" />}</span>
//   </Button>
// );
