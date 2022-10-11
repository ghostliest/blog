import { useLayoutEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "@ui";
import { useTypedSelector, useActions } from "@hooks";
import { PublicRoutesEnum, PrivateRoutesEnum, TOKEN_KEY } from "@constants";
import { nextRoute } from "@utils";
import { selectIsAuth } from "@store/selectors/user.selector";

export const Header = () => {
  const { SIGNIN, SIGNUP, HOME } = PublicRoutesEnum;
  const { CMS_POSTS } = PrivateRoutesEnum;

  const isAuth = useTypedSelector(selectIsAuth);
  const { setLogout, setLayoutHeader } = useActions();

  const router = useRouter();

  const ref = useRef() as any;

  useLayoutEffect(() => {
    if (window !== undefined) {
      const clientHeight = ref?.current?.getBoundingClientRect().height;
      const margin = +window.getComputedStyle(ref?.current).marginBottom.split("px")[0];
      setLayoutHeader({ height: clientHeight + margin });
    }
  }, []);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    const exit = confirm("Are you sure you want to logout");
    if (exit) {
      setLogout();
      localStorage.removeItem(TOKEN_KEY);
    }
  };

  const Sign = () => (
    <div className="flex gap-2">
      {isAuth ? (
        <>
          <Button href={CMS_POSTS} appearance="outline">
            CMS
          </Button>
          <Button appearance="outlineHoverRed" onClick={(e) => handleLogout(e)}>
            Logout
          </Button>
        </>
      ) : (
        <>
          <Button href={nextRoute(SIGNIN, router.asPath)} appearance="transparent">
            Log in
          </Button>
          <Button href={nextRoute(SIGNUP, router.asPath)} appearance="outline">
            Create account
          </Button>
          <Button href={nextRoute(SIGNIN, CMS_POSTS)} appearance="outline">
            CMS
          </Button>
        </>
      )}
    </div>
  );

  const Home = () => (
    <Link href={HOME}>
      <a className="group flex items-center justify-center self-center w-11 h-11 bg-primary-color-hover hover:bg-violet-200 rounded-full transition-all">
        <span className="group-hover:text-violet-600 font-bold text-4xl text-primary-color transition-all">B</span>
      </a>
    </Link>
  );

  return (
    <header
      className="flex justify-between px-4 py-2 mb-4 sm:px-6 lg:px-8 bg-white/70 border-b border-border-color backdrop-blur-xl sticky top-0 z-50"
      ref={ref}
    >
      <Home />
      <Sign />
    </header>
  );
};
