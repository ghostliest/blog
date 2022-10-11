import { Fragment, useEffect, useState } from "react";
import { Spinner } from "@ui";
import { getActivity, IActivityResponse } from "@services";
import { useVisibilityChange, useInterval } from "@hooks";
import { ReactionItem, SubscribeItem } from "./components";

export const LastActivity = () => {
  const [activity, setActivity] = useState<IActivityResponse[] | null>(null);

  const isVisible = useVisibilityChange();

  const getActivityWrap = () => {
    getActivity({ page: 1, limit: 2 }).then((res) => {
      setActivity(res);
    });
  };

  useInterval(() => {
    if (isVisible) {
      getActivityWrap();
    }
  }, 10000);

  useEffect(() => {
    getActivityWrap();
  }, []);

  return (
    <div className="flex flex-col h-auto overflow-y-auto">
      <h2 className="text-center pb-4 pr-4">LAST ACTIVITY</h2>
      {activity !== null ? (
        <div className="flex flex-col gap-2 overflow-y-scroll break-all">
          {activity?.map(({ data: d, createAt, type }) => (
            <Fragment key={createAt.toString()}>
              {"post" in d ? (
                <ReactionItem key={type + d.post.id + d.user.id} data={d} createAt={createAt} type={type} />
              ) : (
                <SubscribeItem key={type + d.follower.id + d.followed.id} data={d} createAt={createAt} />
              )}
            </Fragment>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-full min-h-[200px]">
          <Spinner size="m" />
        </div>
      )}
    </div>
  );
};
