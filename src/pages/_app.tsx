import type { AppProps } from 'next/app';
import { Hydrate, QueryClient, QueryClientConfig, QueryClientProvider } from 'react-query';
import '@/styles/reset.css';
import '@/styles/global.css';
import Layout from '@/components/layout/Layout';
import { useState } from 'react';
import { DehydratedStateProps } from '@/types/common';
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';

interface PageProps extends DehydratedStateProps {
  initialSession: Session;
}

const config: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
};

export default function MyApp({ Component, pageProps }: AppProps<PageProps>) {
  const [queryClient] = useState(() => new QueryClient(config));
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Hydrate>
      </QueryClientProvider>
    </SessionContextProvider>
  );
}
