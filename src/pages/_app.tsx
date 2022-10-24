import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import '@/styles/reset.css';
import '@/styles/global.css';
import Layout from '@/components/layout/Layout';

export default function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}
