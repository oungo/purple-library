import styled from 'styled-components';
import { PostgrestResponse } from '@supabase/supabase-js';
import TableBody from './TableBody';
import { Book } from '@/types/book';

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
  margin-bottom: 1rem;
`;
const THeadTr = styled.tr`
  border-bottom: 1px solid black;
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
  books: PostgrestResponse<Book>;
}

export default function Table({ books }: TableProps) {
  return (
    <TableWrapper>
      <BookTable>
        <Caption>도서 목록</Caption>
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
            <th></th>
          </THeadTr>
        </thead>
        <tbody>
          <TableBody books={books} />
        </tbody>
      </BookTable>
    </TableWrapper>
  );
}
