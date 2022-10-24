import * as queryKeys from '@/utils/queryKeys';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getBooks } from '@/utils/book/getBooks';
import { colors } from '@/styles/color';
import Link from 'next/link';
import styled from 'styled-components';
import { useModalStore } from '@/store/useModalStore';
import { useBookIdStore } from '@/store/useBookIdStore';
import { getBookStatus } from '@/utils/common';
import { BookResponse } from '@/types/book';
import { deleteBook } from '@/utils/book/deleteBook';

const TBodyTr = styled.tr`
  a {
    display: block;
  }
  :hover {
    background-color: ${colors.gray};
  }
  td {
    text-align: center;
  }
`;
const TableItem = styled.p`
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
  books: BookResponse;
}

export default function TableBody({ books }: ITableBodyProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const query = router.query;

  const { mutate } = useMutation(deleteBook, {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.BOOKS]);
    },
  });

  const { open } = useModalStore();
  const { setId } = useBookIdStore();

  const handleOpen = (id: number) => {
    setId(id);
    open();
  };

  const handleDelete = (id: number) => {
    mutate(id);
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
            <td>
              <EditButton onClick={() => handleDelete(book.id)}>삭제</EditButton>
            </td>
          </TBodyTr>
        );
      })}
    </>
  );
}
