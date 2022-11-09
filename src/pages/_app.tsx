import type { AppProps } from 'next/app';
import { Hydrate, QueryClient, QueryClientConfig, QueryClientProvider } from 'react-query';
import '@/styles/reset.css';
import '@/styles/global.css';
import { ReactElement, ReactNode, useState } from 'react';
import { DehydratedStateProps } from '@/types/common';
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { NextPage } from 'next';

interface PageProps extends DehydratedStateProps {
  initialSession: Session;
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps<PageProps> & {
  Component: NextPageWithLayout<PageProps>;
};

const config: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
      useErrorBoundary: true,
      suspense: true,
    },
  },
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient(config));
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          {getLayout(<Component {...pageProps} />)}
        </Hydrate>
      </QueryClientProvider>
    </SessionContextProvider>
  );
}
