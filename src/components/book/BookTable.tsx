import * as queryKeys from '@/utils/queryKeys';
import { useBookMutation } from '@/hooks/mutations/book';
import { useBooks } from '@/hooks/queries/book';
import { Book, PartialBook } from '@/types/book';
import { ColumnsType } from '@/types/common';
import { BOOK_MODAL_ID, getBookStatus } from '@/utils/common';
import { useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import { Table } from '../common/Table';
import Modal from '../common/Modal';
import BookModalContent from './BookModalContent';
import { colors } from '@/styles/color';
import styled from 'styled-components';
import Button from '../common/Button';
import { useBoundStore } from '@/store/useBoundStore';
import Pagination from './Pagination';
import { useCurrentUser } from '../../hooks/queries/useCurrentUser';

const UpdateButton = styled.button`
  color: ${colors.second};
`;

type UserColumnsType = ColumnsType<Book>;

const columns: UserColumnsType = [
  {
    title: '제목',
    dataIndex: 'title',
    align: 'center',
  },
  {
    title: '저자',
    dataIndex: 'author',
    align: 'center',
    width: '15%',
  },
  {
    title: '출판사',
    dataIndex: 'publisher',
    align: 'center',
    width: '15%',
  },
  {
    title: '상태',
    dataIndex: 'inStock',
    align: 'center',
    width: '10%',
    render: getBookStatus,
  },
  {
    title: '단가',
    dataIndex: 'discount',
    align: 'center',
    width: '8%',
    render: (value = '') => new Intl.NumberFormat('ko').format(value),
  },
  {
    title: '구매자',
    dataIndex: 'buyer',
    align: 'center',
    width: '7%',
  },
  {
    title: '보유자',
    dataIndex: 'lender',
    align: 'center',
    width: '7%',
    render: (value: string, { inStock }) => (inStock ? value || '공용서가' : ''),
  },
];

export default function BookTable() {
  const router = useRouter();
  const user = useUser();
  const queryClient = useQueryClient();
  const { data: currentUser } = useCurrentUser(user?.id);

  const selectedBookId = useBoundStore((state) => state.selectedBookId);
  const setSelectedBookId = useBoundStore((state) => state.setSelectedBookId);

  const { data: books } = useBooks(router.query);

  const { mutate } = useBookMutation({
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.BOOKS]);
    },
  });

  const handleChangeBookStatus = (data: PartialBook) => {
    mutate(data);
  };

  const newColumns: UserColumnsType = [
    ...columns,
    {
      title: '',
      align: 'center',
      width: '10%',
      render: (_, { id, inStock, lender }) => {
        if (inStock) {
          return user?.email === lender ? (
            <Button size="small" onClick={() => handleChangeBookStatus({ id, lender: '' })}>
              반납
            </Button>
          ) : (
            <Button
              size="small"
              buttonType="primary"
              onClick={() => handleChangeBookStatus({ id, lender: user?.email })}
            >
              대여
            </Button>
          );
        }

        return (
          <Button size="small" onClick={() => handleChangeBookStatus({ id, inStock: true })}>
            보유 도서로 이동
          </Button>
        );
      },
    },
    {
      dataIndex: 'id',
      width: '5%',
      render: (value: number) => (
        <UpdateButton onClick={() => setSelectedBookId(value)}>수정</UpdateButton>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={currentUser?.data?.role === 'admin' ? newColumns : newColumns.slice(0, -1)}
        dataSource={books?.data || []}
      />

      <Pagination totalCount={books?.count || 0} />

      <Modal
        id={BOOK_MODAL_ID}
        title="도서 수정"
        visible={!!selectedBookId}
        closeModal={() => setSelectedBookId(null)}
      >
        <BookModalContent selectedBook={books?.data?.find((book) => book.id === selectedBookId)} />
      </Modal>
    </>
  );
}
