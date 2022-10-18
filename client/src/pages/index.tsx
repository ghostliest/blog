import { ReactElement } from "react";
import { getAllPosts, IGetAllPostsQuery } from "@services";
import { Layout } from "@layout";
import { Home } from "@screens";
import { wrapper } from "@store";
import { setHomePosts } from "@store/action-creators/home.actions";

const HomePage = () => <Home />;

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const { resolvedUrl } = ctx;
  const query = ctx.query as unknown as IGetAllPostsQuery<string, string>;

  const { page, limit, categoryId, tags, sort, orderBy } = store.getState().client.pages.home.query;

  const parsedQuery: IGetAllPostsQuery = {
    page: +query.page!,
    limit: +query.limit!,
    categoryId: +query.categoryId!,
    tags: (query.tags || "").split(",").reduce((a, e) => (+e || +e === 0 ? [...a, +e] : a), [] as number[]),
    orderBy: query.orderBy,
    sort: query.sort,
  };

  const generateQueryString = () => {
    return (
      `/?page=${parsedQuery.page || page}` +
      `&limit=${parsedQuery.limit || limit}` +
      `&categoryId=${parsedQuery.categoryId || categoryId}` +
      `&tags=${parsedQuery.tags || tags?.toString()}` +
      `&sort=${parsedQuery.sort || sort}` +
      `&orderBy=${parsedQuery.orderBy || orderBy}`
    );
  };

  const checkQuery = () => {
    if (
      parsedQuery.page >= 1 &&
      parsedQuery.limit >= 1 &&
      parsedQuery.categoryId! >= 0 &&
      parsedQuery.tags!.toString() &&
      parsedQuery.sort &&
      parsedQuery.orderBy
    ) {
      return true;
    } else {
      return false;
    }
  };

  if (resolvedUrl === "/" || !checkQuery()) {
    return {
      redirect: {
        permanent: true,
        destination: generateQueryString(),
      },
    };
  } else {
    const posts = await getAllPosts(parsedQuery);
    store.dispatch(setHomePosts(posts));
  }

  store.dispatch({ type: "HOME_PAGE" });

  return { props: {} };
});

HomePage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default HomePage;
