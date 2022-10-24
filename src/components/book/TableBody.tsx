import * as queryKeys from '@/utils/queryKeys';
import { PostgrestResponse } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { getBooks } from '@/utils/book/getBooks';
import { colors } from '@/styles/color';
import Link from 'next/link';
import styled from 'styled-components';
import { useModalStore } from '@/store/useModalStore';
import { useBookIdStore } from '@/store/useBookIdStore';
import { getBookStatus } from '@/utils/common';
import { Book } from '@/types/book';

const TBodyTr = styled.tr`
  a {
    display: block;
  }
  :hover {
    background-color: ${colors.gray};
  }
`;
const TableItem = styled.p`
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 5px;
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
  color: ${colors.primary};
`;

export interface ITableBodyProps {
  books: PostgrestResponse<Book>;
}

export default function TableBody({ books }: ITableBodyProps) {
  const router = useRouter();
  const query = router.query;

  const { open } = useModalStore();
  const { setId } = useBookIdStore();

  const handleOpen = (id: number) => {
    setId(id);
    open();
  };

  const { data } = useQuery([queryKeys.BOOKS, query], () => getBooks(query), {
    initialData: books,
    keepPreviousData: true,
  });

  if (!data) return null;

  return (
    <>
      {data.data?.map((book) => {
        return (
          <TBodyTr key={book.id}>
            <td title={book.title}>
              <Link href={`/book/${book.isbn}`}>
                <Title>{book.title}</Title>
              </Link>
            </td>
            <td>
              <TableItem>{book.author}</TableItem>
            </td>
            <td title={book.publisher}>
              <TableItem>{book.publisher}</TableItem>
            </td>
            <td>
              <TableItem>{getBookStatus(book.inStock)}</TableItem>
            </td>
            <td>
              <EditButton onClick={() => handleOpen(book.id)}>수정</EditButton>
            </td>
          </TBodyTr>
        );
      })}
    </>
  );
}
