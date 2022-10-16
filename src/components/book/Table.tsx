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
const Caption = styled.caption`
  font-size: 1.5rem;
  font-weight: bold;
`;
const THeadTr = styled.tr`
  border-bottom: 1px solid black;
`;
const TBodyTr = styled.tr`
  a {
    display: block;
  }
  :hover {
    background-color: var(--gray-color);
  }
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
    async () => await supabase.from('book').select('*', { count: 'exact' }).range(0, 19),
    {
      initialData: books,
    }
  );

  if (!data) return null;

  return (
    <TableWrapper>
      <BookTable>
        <Caption>전체 도서 목록</Caption>
        <colgroup>
          <col></col>
          <AuthorCol></AuthorCol>
          <PublisherCol></PublisherCol>
          <InStockCol></InStockCol>
        </colgroup>
        <thead>
          <THeadTr>
            <th>제목</th>
            <th>저자</th>
            <th>출판사</th>
            <th>상태</th>
          </THeadTr>
        </thead>
        <tbody>
          {data.data?.map((book) => {
            return (
              <TBodyTr key={book.id}>
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
              </TBodyTr>
            );
          })}
        </tbody>
      </BookTable>
    </TableWrapper>
  );
}
