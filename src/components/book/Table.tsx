import { supabase } from '@/utils/supabaseClient';
import * as queryKeys from '@/utils/queryKeys';
import { LibraryBook } from '@/types/book';
import { useQuery } from 'react-query';
import { PostgrestResponse } from '@supabase/postgrest-js/src/types';

export interface TableProps {
  books: PostgrestResponse<LibraryBook>;
}

export default function Table({ books }: TableProps) {
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
