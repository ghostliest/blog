import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { getAllTags, ITagResponse } from "@services";
import { Tag } from "@ui";

const MIN_LENGTH = 1;
const MAX_LENGTH = 5;

export const Tags = forwardRef<number[]>((_, ref: any) => {
  const [tags, setTags] = useState<ITagResponse[] | []>([]);
  const [ids, setIds] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState<boolean | undefined>(undefined);

  useImperativeHandle(ref, () => ({
    getValue: () => ids,
    setValue: (value: number[]) => setIds(value),
    check: () => isComplete,
    clear: () => {
      setIds([]);
      setIsComplete(undefined);
    },
  }));

  useEffect(() => {
    getAllTags().then((res) => setTags(res));
  }, []);

  useEffect(() => {
    if (ids.length < MIN_LENGTH) {
      setIsComplete(false);
    } else {
      setIsComplete(true);
    }
  }, [ids]);

  const handleChoice = (id: number) => {
    if (ids.includes(id)) {
      setIds((p) => [...p.filter((el) => el !== id)]);
    } else if (ids.length < MAX_LENGTH) {
      setIds((p) => [...p, id]);
    }
  };

  return (
    <div className="flex flex-col relative">
      <div className="flex flex-wrap gap-2">
        {tags.map(({ id, value }) => (
          <Tag key={id} size="m" isActive={ids.includes(id)} onClick={() => handleChoice(id)}>
            {value}
          </Tag>
        ))}
      </div>
      <span className="absolute right-0 bottom-[-28px] font-medium text-sm text-gray-400">{ids.length}</span>
    </div>
  );
});

Tags.displayName = "Tags";
