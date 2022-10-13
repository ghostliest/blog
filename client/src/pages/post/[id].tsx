import { ReactElement } from "react";
import { getAuthorPosts, getOnePost } from "@services";
import { Post } from "@screens";
import { Layout } from "@layout";
import { PublicRoutesEnum } from "@constants";
import { wrapper } from "@store";
import { setAuthorPosts, setPost } from "@store/action-creators/post.actions";

const PostPage = () => <Post />;

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ params }) => {
  const { dispatch } = store;
  const post = await getOnePost(+params?.id!);

  if (!post?.id) {
    return {
      redirect: {
        destination: PublicRoutesEnum.NOT_FOUND,
        permanent: false,
      },
    };
  } else {
    const authorPosts = await getAuthorPosts({ page: 1, limit: 3, authorId: post.user.id });
    dispatch(setPost(post));
    dispatch(setAuthorPosts(authorPosts));
  }

  dispatch({ type: "POST_PAGE" });
  return { props: {} };
});

PostPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default PostPage;
