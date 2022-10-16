import { supabase } from '@/utils/supabaseClient';
import * as queryKeys from '@/utils/queryKeys';
import { LibraryBook } from '@/types/book';
import { useQuery } from 'react-query';
import { PostgrestResponse } from '@supabase/postgrest-js/src/types';
import Link from 'next/link';
import styled from 'styled-components';

const TableWrapper = styled.div`
  padding: 0 100px;
`;
const BookTable = styled.table`
  table-layout: fixed;
  width: 100%;
`;
const TableItem = styled.p`
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 5px;
`;
const AuthorCol = styled.col`
  width: 15%;
`;
const PublisherCol = styled.col`
  width: 15%;
`;
const InStockCol = styled.col`
  width: 10%;
`;

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
    <TableWrapper>
      <BookTable>
        <caption>전체 도서 목록</caption>
        <colgroup>
          <col></col>
          <AuthorCol></AuthorCol>
          <PublisherCol></PublisherCol>
          <InStockCol></InStockCol>
        </colgroup>
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
                  <TableItem>
                    <Link href={`/book/${book.isbn}`}>{book.title}</Link>
                  </TableItem>
                </td>
                <td>
                  <TableItem>{book.author}</TableItem>
                </td>
                <td>
                  <TableItem>{book.publisher}</TableItem>
                </td>
                <td>
                  <TableItem>{book.inStock ? '보유중' : '구매 예정'}</TableItem>
                </td>
              </tr>
            );
          })}
        </tbody>
      </BookTable>
    </TableWrapper>
  );
}
