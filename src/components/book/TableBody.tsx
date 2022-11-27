import { useBooks } from '@/hooks/queries/book';
import { useBoundStore } from '@/store/useBoundStore';
import { colors } from '@/styles/color';
import { Book } from '@/types/book';
import { BOOK_MODAL_ID, getBookStatus } from '@/utils/common';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import ModalPortal from '../common/ModalPortal';
import BookModal from './BookModal';
import EditBookStatusButton from './EditBookStatusButton';

const Tr = styled.tr`
  :hover {
    background-color: ${colors.lightGray};
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
const EmptyText = styled.td`
  position: absolute;
  width: 100%;
  text-align: center;
  padding: 1rem;
  color: ${colors.darkGray};
`;

const TableBody = () => {
  const router = useRouter();

  const { data: books } = useBooks(router.query);

  if (books?.count === 0)
    return (
      <tr>
        <EmptyText>조회된 데이터가 없습니다</EmptyText>
      </tr>
    );

  return (
    <>
      {books?.data?.map((book) => (
        <TableItem key={book.id} book={book} />
      ))}

      <div id={BOOK_MODAL_ID} />
      <ModalPortal id={BOOK_MODAL_ID}>
        <BookModal />
      </ModalPortal>
    </>
  );
};

interface TableItemProps {
  book: Book;
}
function TableItem({ book }: TableItemProps) {
  const setSelectedBookId = useBoundStore((state) => state.setSelectedBookId);

  const handleClickTitle = () => {
    setSelectedBookId(book.id);
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
        <Td>{book.inStock ? book.lender || '공용서가' : ''}</Td>
        <Td>
          <EditBookStatusButton id={book.id} inStock={book.inStock} lender={book.lender} />
        </Td>
      </Tr>
    </>
  );
}

export default TableBody;
