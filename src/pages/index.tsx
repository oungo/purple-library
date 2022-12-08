import BookList from '@/components/book/BookList';
import { DehydratedStateProps } from '@/types/common';
import { getBooks } from 'api/books';
import { GetServerSideProps } from 'next';
import { QueryClient, dehydrate } from 'react-query';
import * as queryKeys from '@/utils/queryKeys';
import { NextPageWithLayout } from './_app';
import { getLayout } from '@/components/layout/Layout';
import { getServerSession, redirectLoginPage } from 'api/auth';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import SSRSafeSuspence from '@/components/SSRSafeSuspense';
import ErrorComponent from '@/components/common/ErrorComponent';
import ErrorBoundary, { ErrorType } from '@/components/ErrorBoundary';
import Loading from '@/components/common/Loading';

interface IndexProps {
  error: ErrorType;
}

const Index: NextPageWithLayout<IndexProps> = ({ error }) => {
  if (error) return <ErrorComponent error={error} />;

  return (
    <ErrorBoundary renderFallback={({ error }) => <ErrorComponent error={error} />}>
      <SSRSafeSuspence fallback={<Loading />}>
        <BookList />
      </SSRSafeSuspence>
    </ErrorBoundary>
  );
};

export const getServerSideProps: GetServerSideProps<DehydratedStateProps> = async (context) => {
  const supabaseClient = createServerSupabaseClient(context);
  const session = await getServerSession(supabaseClient);

  if (!session) return redirectLoginPage();

  const queryClient = new QueryClient();

  let error = null;

  await queryClient
    .fetchQuery([queryKeys.BOOKS, context.query], () => getBooks(context.query))
    .catch((err) => (error = err));

  return {
    props: { error, dehydratedState: dehydrate(queryClient) },
  };
};

Index.getLayout = getLayout;

export default Index;
