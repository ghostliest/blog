import { ReactElement, ReactNode, useEffect } from "react";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import JwtDecode from "jwt-decode";
import { wrapper } from "@store";
import { refreshToken } from "@services";
import { TOKEN_KEY } from "@constants";
import { useActions } from "@hooks";
import { UserInterface } from "@store/types/user.types";
import "@styles/globals.scss";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  const { setUser, setAuth } = useActions();

  useEffect(() => {
    refreshToken().then((res) => {
      if (res.token) {
        localStorage.setItem(TOKEN_KEY, res.token);
        const decoded = JwtDecode<UserInterface>(res.token);
        setUser(decoded);
      } else {
        setAuth(false);
      }
    });
  }, []);

  return getLayout(<Component {...pageProps} />);
}

export default wrapper.withRedux(MyApp);
