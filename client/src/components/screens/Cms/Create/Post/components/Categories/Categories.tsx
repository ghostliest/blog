import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { getAllCategories, ICategoryResponse } from "@services";
import { Category } from "@ui";

export const Categories = forwardRef((_, ref) => {
  const [categories, setCategories] = useState<ICategoryResponse[] | []>([]);
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const [isComplete, setIsComplete] = useState<boolean | undefined>(undefined);

  useImperativeHandle(ref, () => ({
    getValue: () => categoryId,
    setValue: (value: number) => setCategoryId(value),
    check: () => isComplete,
    clear: () => {
      setCategoryId(undefined);
      setIsComplete(undefined);
    },
  }));

  useEffect(() => {
    getAllCategories().then((res) => setCategories(res));
  }, []);

  useEffect(() => {
    if (categoryId) {
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
  }, [categoryId]);

  const handleChoice = (id: number) => {
    if (categoryId !== id) {
      setCategoryId(id);
      setIsComplete(true);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map(({ id, value }) => (
        <Category key={id} size="m" isActive={categoryId === id} onClick={() => handleChoice(id)}>
          {value}
        </Category>
      ))}
    </div>
  );
});

Categories.displayName = "Categories";
