import BookModal from '@/components/book/BookModal';
import Table from '@/components/book/Table';
import ModalPortal from '@/components/common/ModalPortal';
import { DehydratedStateProps } from '@/types/common';
import { BOOK_MODAL_ID } from '@/utils/common';
import { getBooks } from 'api/books';
import { GetServerSideProps } from 'next';
import { QueryClient, dehydrate } from 'react-query';
import * as queryKeys from '@/utils/queryKeys';
import { NextPageWithLayout } from './_app';
import { getLayout } from '@/components/layout/Layout';
import { getServerSession, redirectLoginPage } from 'api/auth';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import SSRSafeSuspence from '@/components/SSRSafeSuspense';
import Error from '@/components/common/Error';
import ErrorBoundary, { ErrorType } from '@/components/ErrorBoundary';
import Loading from '@/components/common/Loading';

interface IndexProps {
  error: ErrorType;
}

const Index: NextPageWithLayout<IndexProps> = ({ error }) => {
  if (error) return <Error error={error} />;

  return (
    <>
      <ErrorBoundary renderFallback={({ error }) => <Error error={error} />}>
        <SSRSafeSuspence fallback={<Loading />}>
          <Table />
        </SSRSafeSuspence>
      </ErrorBoundary>

      <div id={BOOK_MODAL_ID} />
      <ModalPortal id={BOOK_MODAL_ID}>
        <BookModal />
      </ModalPortal>
    </>
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
