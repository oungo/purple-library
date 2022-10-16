import { supabase } from '@/utils/supabaseClient';
import * as queryKeys from '@/utils/queryKeys';
import { LibraryBook } from '@/types/book';
import { useQuery } from 'react-query';
import { PostgrestResponse } from '@supabase/postgrest-js/src/types';
import Link from 'next/link';

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
          <th>상태</th>
        </tr>
      </thead>
      <tbody>
        {data.data?.map((book) => {
          return (
            <tr key={book.id}>
              <td>
                <Link href={`/book/${book.isbn}`}>{book.title}</Link>
              </td>
              <td>{book.author}</td>
              <td>{book.publisher}</td>
              <td>{book.inStock ? '보유중' : '구매 예정'}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
