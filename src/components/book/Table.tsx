import { colors } from '@/styles/color';
import styled from 'styled-components';
import Pagination from './Pagination';
import TableBody from './TableBody';
import Tabs from './Tabs';

//#region
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
const PriceCol = styled.col`
  width: 8%;
`;
const BuyerCol = styled.col`
  width: 7%;
`;
const LenderCol = styled.col`
  width: 7%;
`;
const TBody = styled.tbody`
  position: relative;
`;

//#endregion

export default function Table() {
  return (
    <>
      <Tabs />

      <TableWrapper>
        <BookTable>
          <Caption>도서 목록</Caption>
          <colgroup>
            <col></col>
            <AuthorCol></AuthorCol>
            <PublisherCol></PublisherCol>
            <InStockCol></InStockCol>
            <PriceCol></PriceCol>
            <BuyerCol></BuyerCol>
            <LenderCol></LenderCol>
            <UpdateCol></UpdateCol>
          </colgroup>
          <thead>
            <THeadTr>
              <th>제목</th>
              <th>저자</th>
              <th>출판사</th>
              <th>상태</th>
              <th>단가</th>
              <th>구매자</th>
              <th>보유자</th>
              <th></th>
            </THeadTr>
          </thead>
          <TBody>
            <TableBody />
          </TBody>
        </BookTable>
      </TableWrapper>

      <Pagination />
    </>
  );
}
