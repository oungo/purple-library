import { useBooks } from '@/hooks/queries/book';
import { useBoundStore } from '@/store/useBoundStore';
import { colors } from '@/styles/color';
import { Book } from '@/types/book';
import { getBookStatus } from '@/utils/common';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Loading from '../common/Loading';
import EditBookStatusButton from './EditBookStatusButton';
import Pagination from './Pagination';

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
const Tr = styled.tr`
  :hover {
    background-color: ${colors.gray};
  }
`;
const Td = styled.td`
  padding: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
`;
const Title = styled.a`
  cursor: pointer;
`;
//#endregion

export default function Table() {
  const router = useRouter();

  const { data: books, isLoading } = useBooks(router.query);

  if (isLoading) return <Loading />;
  if (!books?.data) return null;

  return (
    <>
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
          <tbody>
            {books.data.map((book) => (
              <TableItem key={book.id} book={book} />
            ))}
          </tbody>
        </BookTable>
      </TableWrapper>

      <Pagination />
    </>
  );
}

interface TableItemProps {
  book: Book;
}

function TableItem({ book }: TableItemProps) {
  const setIsOpen = useBoundStore((state) => state.setIsOpen);
  const setSelectedBookId = useBoundStore((state) => state.setSelectedBookId);

  const handleClickTitle = () => {
    setSelectedBookId(book.id);
    setIsOpen(true);
  };

  return (
    <>
      <Tr key={book.id}>
        <Td title={book.title} onClick={handleClickTitle}>
          <Title>{book.title}</Title>
        </Td>
        <Td>{book.author}</Td>
        <Td title={book.publisher || ''}>{book.publisher}</Td>
        <Td>{getBookStatus(book.inStock)}</Td>
        <Td>{book.discount}</Td>
        <Td>{book.buyer}</Td>
        <Td>{book.lender || '공용서가'}</Td>
        <Td>
          <EditBookStatusButton id={book.id} inStock={book.inStock} lender={book.lender} />
        </Td>
      </Tr>
    </>
  );
}
