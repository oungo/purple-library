import * as queryKeys from '@/utils/queryKeys';
import { useBookMutation } from '@/hooks/mutations/book';
import { useBooks } from '@/hooks/queries/book';
import { Book, PartialBook } from '@/types/book';
import { ColumnsType } from '@/types/common';
import { BOOK_MODAL_ID } from '@/utils/common';
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
import { useUser } from '@/hooks/use-user';
import { useCheckAdmin } from '@/hooks/use-check-admin';

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
    render: (value) => (value ? '보유중' : '구매예정'),
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
    render: (value: string) => value.split('@')[0],
  },
  {
    title: '보유자',
    dataIndex: 'lender',
    align: 'center',
    width: '7%',
    render: (value: string, { inStock }) => (inStock ? value?.split('@')[0] || '공용서가' : ''),
  },
];

export default function BookTable() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: user } = useUser();
  const { data: books } = useBooks(router.query);
  const isAdmin = useCheckAdmin();

  const selectedBookId = useBoundStore((state) => state.selectedBookId);
  const setSelectedBookId = useBoundStore((state) => state.setSelectedBookId);

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
          return user?.data?.email === lender || user?.data?.name === lender ? (
            <Button size="small" onClick={() => handleChangeBookStatus({ id, lender: '' })}>
              반납
            </Button>
          ) : (
            <Button
              size="small"
              buttonType="primary"
              onClick={() =>
                handleChangeBookStatus({
                  id,
                  lender: (user?.data?.name || user?.data?.email) ?? '',
                })
              }
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
        columns={isAdmin ? newColumns : newColumns.slice(0, -1)}
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
