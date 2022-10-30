import type { AppProps } from 'next/app';
import { Hydrate, QueryClient, QueryClientConfig, QueryClientProvider } from 'react-query';
import '@/styles/reset.css';
import '@/styles/global.css';
import Layout from '@/components/layout/Layout';
import { useState } from 'react';
import { DehydratedStateProps } from '@/types/common';

const config: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
};

export default function MyApp({ Component, pageProps }: AppProps<DehydratedStateProps>) {
  const [queryClient] = useState(() => new QueryClient(config));

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Hydrate>
    </QueryClientProvider>
  );
}
