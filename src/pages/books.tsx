import { GetServerSideProps } from 'next';
import Table from '@/components/book/Table';
import { getBooks } from '@/utils/book/getBooks';
import Pagination from '@/components/Pagination';
import Tabs from '@/components/Tabs';
import { BOOK_MODAL_ID } from '@/utils/common';
import ModalPortal from '@/components/ModalPortal';
import { PostgrestResponse } from '@supabase/supabase-js';
import { definitions } from '@/types/supabase';
import BookModal from '@/components/book/BookModal';

interface BooksProps {
  books: PostgrestResponse<definitions['book']>;
}
export default function Books({ books }: BooksProps) {
  return (
    <>
      <Tabs />
      <Table books={books} />
      <Pagination total={books.count || 0} />

      <div id={BOOK_MODAL_ID} />
      <ModalPortal id={BOOK_MODAL_ID}>
        <BookModal />
      </ModalPortal>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const books = await getBooks(context.query);
  return { props: { books } };
};
