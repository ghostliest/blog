import React, { Dispatch, SetStateAction } from "react";
import { AuthorsStatisticType, IGetAuthorsStatisticResponse } from "@services";

interface HeaderProps {
  setStatistics: Dispatch<SetStateAction<IGetAuthorsStatisticResponse[] | null>>;
  setNavigateIdx: Dispatch<SetStateAction<number>>;
  navigate: {
    label: string;
    type: AuthorsStatisticType;
  }[];
  navigateIdx: number;
}

export const Header = ({ setStatistics, setNavigateIdx, navigate, navigateIdx }: HeaderProps) => {
  const handleNavigate = (type: AuthorsStatisticType) => {
    const idx = navigate.findIndex((el) => el.type === type);
    if (idx !== navigateIdx) {
      setStatistics(null);
      setNavigateIdx(idx);
    }
  };

  return (
    <div className="relative">
      <div className="flex flex-row gap-4 justify-around bg-slate-100 p-1 rounded-xl select-none">
        {navigate.map(({ label, type }) => (
          <div
            key={label}
            onClick={() => handleNavigate(type)}
            className={`flex flex-1 w-full justify-center z-10 cursor-pointer`}
          >
            {label}
          </div>
        ))}
      </div>
      <div
        className="absolute bg-white rounded-xl h-[80%] top-[10%] transition-all duration-200"
        style={{ width: `calc(${100 / navigate.length}%)`, transform: `translateX(${navigateIdx * 100}%)` }}
      ></div>
    </div>
  );
};
