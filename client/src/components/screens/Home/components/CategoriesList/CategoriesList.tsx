import { useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";
import { Category } from "@ui";
import { getAllCategories, ICategoryResponse } from "@services";
import { useActions, useTypedSelector } from "@hooks";
import { selectHomeQueryCategoryId } from "@store/selectors/pages.selector";
import { CollapseBtn } from "..";

export const CategoriesList = () => {
  const [allCategories, setAllCategories] = useState<ICategoryResponse[]>([]);
  const [isCollapsed, setCollapsed] = useState(false);

  const categoryId = useTypedSelector(selectHomeQueryCategoryId);
  const { setHomeQueryCategory } = useActions();

  const router = useRouter();

  const getCategoryFromQuery = () => +(router.query.categoryId as string);

  const syncQueryWithState = () => {
    const id = getCategoryFromQuery();
    if (id !== categoryId) {
      setHomeQueryCategory(id);
    }
  };

  useLayoutEffect(() => {
    syncQueryWithState();
  }, []);

  useEffect(() => {
    getAllCategories().then((res) => setAllCategories([{ id: 0, value: "All Categories" }, ...res]));
  }, []);

  useEffect(() => {
    syncQueryWithState();
  }, [router.query.categoryId]);

  const handleCategoryClick = (id: number) => {
    if (categoryId !== id) {
      setHomeQueryCategory(id);
      router.push({ query: { ...router.query, page: 1, categoryId: id.toString() } });
    }
  };

  const handleCollapseElements = () => {
    setCollapsed((p) => !p);
  };

  return (
    <div className={`flex flex-wrap gap-2 ${!isCollapsed ? "min-h-[110px]" : ""}`}>
      {allCategories.map(({ id, value }) => {
        const isSelect = categoryId === id;
        return (
          <Category
            key={id}
            size="l"
            isActive={isSelect}
            onClick={() => handleCategoryClick(id)}
            className={isCollapsed && !isSelect ? "hidden" : ""}
          >
            {value}
          </Category>
        );
      })}
      <CollapseBtn isCollapsed={isCollapsed} show={!!allCategories.length} onClick={handleCollapseElements} />
    </div>
  );
};
