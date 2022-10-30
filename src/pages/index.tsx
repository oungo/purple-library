import BookModal from '@/components/book/BookModal';
import Pagination from '@/components/book/Pagination';
import SearchInput from '@/components/book/SearchInput';
import SearchResult from '@/components/book/SearchResult';
import Table from '@/components/book/Table';
import Tabs from '@/components/book/Tabs';
import ModalPortal from '@/components/common/ModalPortal';
import { DehydratedStateProps } from '@/types/common';
import { BOOK_MODAL_ID } from '@/utils/common';
import { getBooks } from 'api/books';
import { GetServerSideProps } from 'next';
import { QueryClient, dehydrate } from 'react-query';
import * as queryKeys from '@/utils/queryKeys';

export default function Index() {
  return (
    <>
      <SearchInput />
      <SearchResult />

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
