import { useRouter } from 'next/router';
import { colors } from '@/styles/color';
import Link from 'next/link';
import styled from 'styled-components';
import { getBookStatus } from '@/utils/common';
import { useBooks } from '@/hooks/queries/book';
import { useQueryClient } from 'react-query';
import * as queryKeys from '@/utils/queryKeys';
import { useBookInStockMutation } from '@/hooks/mutations/book';
import Loading from '../common/Loading';

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
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 5px;
`;
const EditButton = styled.button`
  cursor: pointer;
  color: ${colors.brand};
`;

export default function TableBody() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: books, isLoading } = useBooks(router.query);

  const { mutate } = useBookInStockMutation({
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.BOOKS]);
    },
  });

  if (isLoading) return <Loading />;
  if (!books?.data) return null;

  return (
    <>
      {books.data.map((book) => {
        return (
          <Tr key={book.id}>
            <Td title={book.title}>
              <Link href={`/book/${book.isbn}`}>
                <Title>{book.title}</Title>
              </Link>
            </Td>
            <Td>{book.author}</Td>
            <Td title={book.publisher || ''}>{book.publisher}</Td>
            <Td>{getBookStatus(book.inStock)}</Td>
            <Td>{book.discount}</Td>
            <Td>{book.buyer}</Td>
            <Td>
              <EditButton onClick={() => mutate(book.id)}>보유 도서로 이동</EditButton>
            </Td>
          </Tr>
        );
      })}
    </>
  );
}
