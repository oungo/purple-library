import { colors } from '@/styles/color';
import styled from 'styled-components';
import TableBody from './TableBody';

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
  border-bottom: 1px solid ${colors.darkGray};
  background-color: ${colors.gray};
  th {
    padding: 10px 0;
  }
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
const UpdateCol = styled.col`
  width: 10%;
`;

export default function Table() {
  return (
    <TableWrapper>
      <BookTable>
        <Caption>도서 목록</Caption>
        <colgroup>
          <col></col>
          <AuthorCol></AuthorCol>
          <PublisherCol></PublisherCol>
          <InStockCol></InStockCol>
          <UpdateCol></UpdateCol>
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
          <TableBody />
        </tbody>
      </BookTable>
    </TableWrapper>
  );
}
