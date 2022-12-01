import styled from 'styled-components';
import BookTable from './BookTable';
import Pagination from './Pagination';
import Tabs from './Tabs';

//#region
const TableWrapper = styled.div`
  padding: 0 100px;
`;

//#endregion

export default function BookList() {
  return (
    <>
      <Tabs />

      <TableWrapper>
        <BookTable />
      </TableWrapper>

      <Pagination />
    </>
  );
}
