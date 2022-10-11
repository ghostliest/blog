import React, { forwardRef, LegacyRef, ReactNode } from "react";
import { Spinner, UserInfo } from "@ui";
import { IGetAuthorsStatisticResponse } from "@services";

interface ItemsProps {
  statistics: IGetAuthorsStatisticResponse[] | null;
  componentHeight: number;
}

export const Items = forwardRef((props: ItemsProps, ref: LegacyRef<HTMLDivElement> | undefined) => {
  const { statistics, componentHeight } = props;

  const ItemList = () => (
    <>
      {statistics!.map(({ user, ...el }, idx) => (
        <UserInfo key={user.id + idx} user={user} showName={false} onClickToPosts={true} className="bg-green-1">
          <div className="flex w-full justify-evenly text-green-3">
            {Object.entries(el).map(({ "0": key, "1": value }) => (
              <span key={key} className="flex flex-1 justify-center">
                <span className="bg-green-2 p-1 w-[90%] rounded-lg font-semibold text-center">
                  {value > 0 ? `+${value}` : "-"}
                </span>
              </span>
            ))}
          </div>
        </UserInfo>
      ))}
    </>
  );

  const Wrap = ({ className = "", children }: { className?: string; children: ReactNode }) => (
    <div style={{ height: `${componentHeight}px` }} className={className}>
      {children}
    </div>
  );

  return (
    <div className="flex flex-col gap-1" ref={ref}>
      {statistics?.length! > 0 && <ItemList />}
      {statistics === null && (
        <Wrap>
          <Spinner size="m" />
        </Wrap>
      )}
      {statistics?.length === 0 && <Wrap>Not Found</Wrap>}
    </div>
  );
});

Items.displayName = "Items";
