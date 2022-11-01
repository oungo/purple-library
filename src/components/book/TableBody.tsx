import * as queryKeys from '@/utils/queryKeys';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { colors } from '@/styles/color';
import Link from 'next/link';
import styled from 'styled-components';
import { getBookStatus } from '@/utils/common';
import { getBooks } from 'api/books';

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
  const query = router.query;

  const { data } = useQuery([queryKeys.BOOKS, query], () => getBooks(query), {
    keepPreviousData: true,
  });

  if (!data) return null;

  return (
    <>
      {data.data?.map((book) => {
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
              <EditButton>수정</EditButton>
            </Td>
          </Tr>
        );
      })}
    </>
  );
}
