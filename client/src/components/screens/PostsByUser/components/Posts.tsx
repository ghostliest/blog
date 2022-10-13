import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useActions, useTypedSelector } from "@hooks";
import { Post, Spinner } from "@ui";
import { getAllPosts } from "@services";
import { scrollTopSmooth } from "@utils";
import { selectCountPostsByUser, selectPostsByUser, selectQueryPostsByUser } from "@store/selectors/postsByUser.selector";

export const Posts = () => {
  const [height, setHeight] = useState(undefined);

  const query = useTypedSelector(selectQueryPostsByUser);
  const count = useTypedSelector(selectCountPostsByUser);
  const posts = useTypedSelector(selectPostsByUser);
  const { setPostsByUser, setPostsByUserCount } = useActions();

  const router = useRouter();

  const postsRef = useRef(null) as any;

  useEffect(() => {
    if (router.isReady) {
      setPostsByUser(null);
      getAllPosts({ ...query, authorId: +router.query.id! }).then((res) => {
        if (count !== res.count) {
          setPostsByUserCount(res.count);
        }
        setPostsByUser(res.posts);
        setTimeout(() => {
          scrollTopSmooth();
        }, 0);
      });
    }
  }, [router.isReady, query]);

  useEffect(() => {
    if (!height && posts?.length) {
      setHeight(postsRef?.current?.clientHeight);
    }
  }, [posts]);

  return posts === null ? (
    <>
      <div className="h-[50vh]" style={{ height: `${height}px!important` }}>
        <Spinner size="l" />
      </div>
    </>
  ) : (
    <ul className="grid gap-5 xl:grid-cols-3 md:grid-cols-2 md:max-w-fit lg:max-w-none min-h-[450px] h-max" ref={postsRef}>
      {posts?.map((post) => (
        <li key={post.id} className="flex flex-col rounded-[2rem] shadow-lg overflow-hidden">
          <Post post={post} showCategory={true} showAuthor={false} />
        </li>
      ))}
    </ul>
  );
};
