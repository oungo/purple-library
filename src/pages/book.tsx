import { DehydratedStateProps } from '@/types/common';
import { getBooks } from 'api/books';
import { GetServerSideProps } from 'next';
import { QueryClient, dehydrate } from 'react-query';
import * as queryKeys from '@/utils/queryKeys';
import { NextPageWithLayout } from './_app';
import { getLayout } from '@/components/layout/Layout';
import { getServerSession, redirectLoginPage } from 'api/auth';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import ErrorComponent from '@/components/common/ErrorComponent';
import { ErrorType } from '@/components/ErrorBoundary';
import Loading from '@/components/common/Loading';
import BookTable from '@/components/book/BookTable';
import Tabs from '@/components/book/Tabs';
import styled from 'styled-components';
import BookSearchInput from '@/components/book/BookSearchInput';
import { getUser } from 'api/user';
import AsyncBoundary from '@/components/common/AsyncBoundary';

const Head = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

interface IndexProps {
  error: ErrorType;
}

const Book: NextPageWithLayout<IndexProps> = ({ error }) => {
  if (error) return <ErrorComponent error={error} />;

  return (
    <AsyncBoundary
      loadingFallback={<Loading />}
      rejectedFallback={({ error }) => <ErrorComponent error={error} />}
    >
      <Head>
        <Tabs />
        <BookSearchInput />
      </Head>
      <BookTable />
    </AsyncBoundary>
  );
};

export const getServerSideProps: GetServerSideProps<DehydratedStateProps> = async (context) => {
  const supabaseClient = createServerSupabaseClient(context);
  const session = await getServerSession(supabaseClient);

  if (!session) return redirectLoginPage();

  const queryClient = new QueryClient();

  let error = null;

  await queryClient
    .fetchQuery([queryKeys.BOOKS, context.query], () => getBooks(supabaseClient, context.query))
    .catch((err) => (error = err));

  const { data: user } = await queryClient
    .fetchQuery({
      queryKey: [queryKeys.USER, session.user.id],
      queryFn: () => getUser(supabaseClient, session.user.id),
    })
    .catch((err) => (error = err));

  if (!user?.name) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { error, dehydratedState: dehydrate(queryClient) },
  };
};

Book.getLayout = getLayout;

export default Book;
