import { useBooks } from '@/hooks/queries/book';
import { useBoundStore } from '@/store/useBoundStore';
import { colors } from '@/styles/color';
import { Book } from '@/types/book';
import { getBookStatus } from '@/utils/common';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import EditBookStatusButton from './EditBookStatusButton';

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
const Wrapper = styled.td`
  position: absolute;
  width: 100%;
  text-align: center;
  padding: 1rem;
  color: ${colors.darkGray};
`;

const TableBody = () => {
  const router = useRouter();

  const { data: books } = useBooks(router.query);

  if (books?.count === 0) return <TableItemWrapper>조회된 데이터가 없습니다</TableItemWrapper>;

  return (
    <>
      {books?.data?.map((book) => (
        <TableItem key={book.id} book={book} />
      ))}
    </>
  );
};

const TableItemWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <tr>
      <Wrapper>{children}</Wrapper>
    </tr>
  );
};

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
        <Td>{book.inStock ? book.lender || '공용서가' : ''}</Td>
        <Td>
          <EditBookStatusButton id={book.id} inStock={book.inStock} lender={book.lender} />
        </Td>
      </Tr>
    </>
  );
}

export default TableBody;
