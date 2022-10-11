import { GetServerSideProps } from 'next';
import { useQuery } from 'react-query';
import { supabase } from '../utils/supabaseClient';
import { PostgrestResponse } from '@supabase/postgrest-js/src/types';
import { IBook } from '../types/book';
import * as queryKeys from '../utils/queryKeys';

interface IBooksProps {
  books: PostgrestResponse<IBook>;
}
export default function Books({ books }: IBooksProps) {
  const { data } = useQuery(
    [queryKeys.BOOKS],
    async () => await supabase.from('book').select('*', { count: 'exact' }),
    {
      initialData: books,
    }
  );

  if (!data) return null;

  return (
    <table border={1}>
      <thead>
        <tr>
          <th>제목</th>
          <th>저자</th>
          <th>출판사</th>
        </tr>
      </thead>
      <tbody>
        {data.data?.map((book) => {
          return (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publisher}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const books = await supabase.from('book').select('*', { count: 'exact' });
  return { props: { books } };
};
