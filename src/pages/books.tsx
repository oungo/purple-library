import { GetServerSideProps } from 'next';
import { supabase } from '@/utils/supabaseClient';
import { PostgrestResponse } from '@supabase/postgrest-js/src/types';
import { LibraryBook } from '@/types/book';
import Table from '@/components/book/Table';

interface BooksProps {
  books: PostgrestResponse<LibraryBook>;
}
export default function Books({ books }: BooksProps) {
  return <Table books={books} />;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const books = await supabase.from('book').select('*', { count: 'exact' }).range(0, 19);
  return { props: { books } };
};
