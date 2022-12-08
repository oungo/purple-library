import Book from '@/components/book/Book';
import ErrorBoundary, { ErrorType } from '@/components/ErrorBoundary';
import { getLayout } from '@/components/layout/Layout';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { getServerSession, redirectLoginPage } from 'api/auth';
import { GetServerSideProps } from 'next';
import { NextPageWithLayout } from 'pages/_app';
import ErrorComponent from '@/components/common/ErrorComponent';
import * as queryKeys from '@/utils/queryKeys';
import { dehydrate, QueryClient } from 'react-query';
import { DehydratedStateProps } from '@/types/common';
import SSRSafeSuspence from '@/components/SSRSafeSuspense';
import { getNBook } from 'api/naverBook';
import Loading from '@/components/common/Loading';

interface BookInfoProps {
  error: ErrorType;
}

const BookInfo: NextPageWithLayout<BookInfoProps> = ({ error }) => {
  if (error) return <ErrorComponent error={error} />;

  return (
    <ErrorBoundary renderFallback={({ error }) => <ErrorComponent error={error} />}>
      <SSRSafeSuspence fallback={<Loading />}>
        <Book />
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
    .fetchQuery([queryKeys.NAVER_BOOK, context.params?.isbn], () =>
      getNBook(context.params?.isbn as string)
    )
    .catch((err) => (error = err.response.data));

  return {
    props: {
      error,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

BookInfo.getLayout = getLayout;

export default BookInfo;
