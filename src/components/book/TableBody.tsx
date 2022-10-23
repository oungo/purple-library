import * as queryKeys from '@/utils/queryKeys';
import { definitions } from '@/types/supabase';
import { PostgrestResponse } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { getBooks } from '@/utils/book/getBooks';
import { colors } from '@/styles/color';
import Link from 'next/link';
import styled from 'styled-components';
import { useModalStore } from '@/store/useModalStore';

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
  books: PostgrestResponse<definitions['book']>;
}

export default function TableBody({ books }: ITableBodyProps) {
  const router = useRouter();
  const query = router.query;

  const open = useModalStore((state) => state.open);

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
              <TableItem>{book.inStock ? '보유중' : '구매 예정'}</TableItem>
            </td>
            <td>
              <EditButton onClick={open}>수정</EditButton>
            </td>
          </TBodyTr>
        );
      })}
    </>
  );
}
