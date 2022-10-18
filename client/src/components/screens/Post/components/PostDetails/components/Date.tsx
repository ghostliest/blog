import { useTypedSelector } from "@hooks";
import { dateFormat } from "@utils";
import { selectPost } from "@store/selectors/post.selector";

export const Date = () => {
  const { createAt, updatedAt } = useTypedSelector(selectPost);

  const checkDate = () => createAt.split(".")[0] === updatedAt.split(".")[0];

  return (
    <div>
      {checkDate() ? (
        <Timestamp type="created" date={createAt} />
      ) : (
        <>
          <Timestamp type="created" date={createAt} />
          <Timestamp type="updated" date={updatedAt} />
        </>
      )}
    </div>
  );
};

const Timestamp = ({ type, date }: { type: "created" | "updated"; date: string }) => (
  <div>
    <span>{type === "created" ? "Posted on: " : "Updated on: "}</span>
    <span>{dateFormat(date)}</span>
  </div>
);
