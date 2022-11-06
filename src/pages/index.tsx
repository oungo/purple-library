import BookModal from '@/components/book/BookModal';
import Table from '@/components/book/Table';
import Tabs from '@/components/book/Tabs';
import ModalPortal from '@/components/common/ModalPortal';
import { DehydratedStateProps } from '@/types/common';
import { BOOK_MODAL_ID } from '@/utils/common';
import { getBooks } from 'api/books';
import { GetServerSideProps } from 'next';
import { QueryClient, dehydrate } from 'react-query';
import * as queryKeys from '@/utils/queryKeys';
import AuthGuard from '@/components/AuthGuard';
import { NextPageWithLayout } from './_app';
import { getLayout } from '@/components/layout/Layout';
import { createServerSupabaseClient, User } from '@supabase/auth-helpers-nextjs';

const Index: NextPageWithLayout<{ user: User }> = ({ user }) => {
  if (!user) return <AuthGuard />;

  return (
    <>
      <Tabs />
      <Table />

      <div id={BOOK_MODAL_ID} />
      <ModalPortal id={BOOK_MODAL_ID}>
        <BookModal />
      </ModalPortal>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<DehydratedStateProps> = async (context) => {
  const supabase = createServerSupabaseClient(context);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  const queryClient = new QueryClient();

  await queryClient.fetchQuery([queryKeys.BOOKS, context.query], () => getBooks(context.query));

  return {
    props: { dehydratedState: dehydrate(queryClient), initialSession: session, user: session.user },
  };
};

Index.getLayout = getLayout;

export default Index;
