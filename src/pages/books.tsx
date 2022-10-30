import { GetServerSideProps } from 'next';
import Table from '@/components/book/Table';
import { getBooks } from '@/utils/book/getBooks';
import Pagination from '@/components/book/Pagination';
import Tabs from '@/components/book/Tabs';
import { BOOK_MODAL_ID } from '@/utils/common';
import ModalPortal from '@/components/common/ModalPortal';
import BookModal from '@/components/book/BookModal';
import { dehydrate, QueryClient } from 'react-query';
import * as queryKeys from '@/utils/queryKeys';
import { DehydratedStateProps } from '@/types/common';

export default function Books() {
  return (
    <>
      <Tabs />
      <Table />
      <Pagination />

      <div id={BOOK_MODAL_ID} />
      <ModalPortal id={BOOK_MODAL_ID}>
        <BookModal />
      </ModalPortal>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<DehydratedStateProps> = async (context) => {
  const queryClient = new QueryClient();
  await queryClient.fetchQuery([queryKeys.BOOKS, context.query], () => getBooks(context.query));

  return { props: { dehydratedState: dehydrate(queryClient) } };
};
