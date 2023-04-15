import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from 'react-query'
import "../styles/globals.css";
import { useRouteLoading } from 'src/hooks';
import PropagateLoader from "react-spinners/PropagateLoader"

const queryClient = new QueryClient();

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const routeLoading = useRouteLoading()

  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        {routeLoading ? (
          <div className="flex items-center justify-center h-full">
            <PropagateLoader
              color="#0891b2"
            />
          </div>
        ) : (
          <Component {...pageProps} />
        )}
      </SessionProvider>
    </QueryClientProvider>
  );
};

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default MyApp;
