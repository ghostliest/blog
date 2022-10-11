import { useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";
import { Tag } from "@ui";
import { getAllTags, ITagResponse } from "@services";
import { useActions, useTypedSelector } from "@hooks";
import { selectHomeQueryTags } from "@store/selectors/pages.selector";
import { CollapseBtn } from "..";

export const TagsList = () => {
  const [allTags, setAllTags] = useState<ITagResponse[]>([]);
  const [isCollapsed, setCollapsed] = useState(false);

  const tagsFromState = useTypedSelector(selectHomeQueryTags);
  const { setHomeQueryTags } = useActions();

  const router = useRouter();

  const getTagsFromQuery = () => (router.query.tags as string).split(",").map(Number);

  const setSelectedTags = (tags: number[]) => {
    setHomeQueryTags(tags);
    router.push({ query: { ...router.query, page: 1, tags: tags.toString() } });
  };

  const syncQueryWithState = () => {
    const ids = getTagsFromQuery();
    if (ids.toString() !== tagsFromState?.toString()) {
      setHomeQueryTags(ids);
    }
  };

  useLayoutEffect(() => {
    syncQueryWithState();
  }, []);

  useEffect(() => {
    getAllTags().then((res) => setAllTags([{ id: 0, value: "All Tags" }, ...res]));
  }, []);

  useEffect(() => {
    syncQueryWithState();
  }, [router.query.tags]);

  const isInclude = (id: number) => {
    return tagsFromState!.includes(id);
  };

  const handleTagClick = (id: number) => {
    if (id === 0 || (tagsFromState?.length === 1 && tagsFromState[0] === id)) {
      setSelectedTags([0]);
    } else if (isInclude(id)) {
      const tmp = [...tagsFromState!.filter((i) => i !== id)];
      setSelectedTags(tmp);
    } else {
      const tmp = [...tagsFromState!.filter((i) => i !== 0), id];
      setSelectedTags(tmp);
    }
  };

  const handleCollapseElements = () => {
    setCollapsed((p) => !p);
  };

  return (
    <div className={`flex flex-wrap gap-2 ${!isCollapsed ? "min-h-[110px]" : ""}`}>
      {allTags.map(({ id, value }) => {
        const isSelect = isInclude(id);
        return (
          <Tag
            key={id}
            size="l"
            isActive={isSelect}
            onClick={() => handleTagClick(id)}
            className={isCollapsed && !isSelect ? "hidden" : ""}
          >
            {value}
          </Tag>
        );
      })}
      <CollapseBtn isCollapsed={isCollapsed} show={!!allTags.length} onClick={handleCollapseElements} />
    </div>
  );
};
