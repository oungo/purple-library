import { GetServerSideProps } from 'next';
import { PostgrestResponse } from '@supabase/postgrest-js/src/types';
import { LibraryBook } from '@/types/book';
import Table from '@/components/book/Table';
import { getBooks } from '@/utils/book/getBooks';
import Pagination from '@/components/pagination';

interface BooksProps {
  books: PostgrestResponse<LibraryBook>;
}
export default function Books({ books }: BooksProps) {
  return (
    <>
      <Table books={books} />
      <Pagination total={books.count ?? 0} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const books = await getBooks();
  return { props: { books } };
};
