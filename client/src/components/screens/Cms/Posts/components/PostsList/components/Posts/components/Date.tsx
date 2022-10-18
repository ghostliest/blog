import { useState } from "react";
import { dateFormat } from "@utils";

export const Date = ({ created, updated }: { created: string; updated: string }) => {
  const [dateCreated] = useState(dateFormat(created));
  const [dateUpdated] = useState(dateFormat(updated));

  return (
    <div className="flex flex-wrap gap-1 justify-center text-center">
      {dateCreated === dateUpdated ? (
        <>
          <span>Published</span>
          <span>{dateCreated}</span>
        </>
      ) : (
        <>
          <span>Last Modified</span>
          <span>{dateUpdated}</span>
        </>
      )}
    </div>
  );
};
