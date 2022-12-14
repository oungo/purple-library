import dynamic from 'next/dynamic';
import * as queryKeys from '@/utils/queryKeys';
import { Book, BookUpdateData } from '@/types/book';
import { ColumnsType } from '@/types/common';
import * as modalIds from '@/utils/modalIds';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { colors } from '@/styles/color';
import styled from 'styled-components';
import Button from '../common/Button';
import { useBoundStore } from '@/store/useBoundStore';
import Pagination from './Pagination';
import { useUser } from '@/hooks/use-user';
import { getBooks, updateBook } from 'api/books';
import { useSupabaseClient } from '@/hooks/use-supabase-client';
import { PostgrestResponse } from '@supabase/supabase-js';
import { formatDate, formatPrice } from '@/utils/common';
import { Suspense } from 'react';
import Loading from '../common/Loading';
import Modal from '../common/Modal';
import Table from '../common/Table';

const BookDetail = dynamic(() => import('./BookDetail'), { suspense: true });

const Title = styled.button`
  color: ${colors.primary};
`;

type UserColumnsType = ColumnsType<Book>;

const columns: UserColumnsType = [
  {
    title: '분류',
    dataIndex: 'category',
    align: 'center',
    width: '9%',
  },
  {
    title: '저자',
    dataIndex: 'author',
    align: 'center',
    width: '8%',
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
    width: '6%',
    render: (value) => (value ? '보유중' : '구매예정'),
  },
  {
    title: '구매일자',
    dataIndex: 'buyDate',
    align: 'center',
    width: '9%',
  },
  {
    title: '단가',
    dataIndex: 'discount',
    align: 'center',
    width: '5%',
    render: formatPrice,
  },
  {
    title: '구매자',
    dataIndex: 'buyer',
    align: 'center',
    width: '5%',
    render: (value: string) => (value?.includes('@') ? value?.split('@')[0] : value),
  },
  {
    title: '보유자',
    dataIndex: 'lender',
    align: 'center',
    width: '7%',
    render: (value: string, { inStock }) => {
      if (!inStock) return '';
      if (!value) return '공용서가';
      return value?.includes('@') ? value?.split('@')[0] : value;
    },
  },
];

export default function BookTable() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const supabaseClient = useSupabaseClient();

  const { data: user } = useUser();
  const { data: books } = useQuery({
    queryKey: [queryKeys.BOOKS, router.query],
    queryFn: () => getBooks(supabaseClient, router.query),
    keepPreviousData: true,
  });

  const selectedBookId = useBoundStore((state) => state.selectedBookId);
  const setSelectedBookId = useBoundStore((state) => state.setSelectedBookId);

  const { mutate } = useMutation<PostgrestResponse<undefined>, unknown, BookUpdateData>({
    mutationFn: (value) => updateBook(supabaseClient, value),
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.BOOKS]);
    },
  });

  const handleChangeBookStatus = (data: BookUpdateData) => {
    mutate(data);
  };

  const newColumns: UserColumnsType = [
    {
      title: '제목',
      dataIndex: 'title',
      align: 'center',
      render: (value, record) => (
        <Title title={value} onClick={() => setSelectedBookId(record.id)}>
          {value}
        </Title>
      ),
    },
    ...columns,
    {
      title: '',
      align: 'center',
      width: '10%',
      render: (_, { id, inStock, lender }) => {
        if (!inStock) {
          return (
            <Button size="small" onClick={() => handleChangeBookStatus({ id, inStock: true })}>
              보유 도서로 이동
            </Button>
          );
        }
        return lender && (user?.data?.email === lender || user?.data?.name === lender) ? (
          <Button
            size="small"
            disabled={user.data.email !== lender && user.data.name !== lender}
            onClick={() => handleChangeBookStatus({ id, lender: '', lendDate: null })}
          >
            반납
          </Button>
        ) : (
          <Button
            size="small"
            buttonType="primary"
            disabled={!!lender}
            onClick={() =>
              handleChangeBookStatus({
                id,
                lender: (user?.data?.name || user?.data?.email) ?? '',
                lendDate: formatDate(Date.now()),
              })
            }
          >
            {lender ? '대여중' : '대여'}
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <Table columns={newColumns} dataSource={books?.data || []} />

      <Pagination totalCount={books?.count || 0} />

      <Modal
        id={modalIds.BOOK_DETAIL}
        title="도서 상세"
        visible={!!selectedBookId}
        closeModal={() => setSelectedBookId(null)}
      >
        <Suspense fallback={<Loading />}>
          <BookDetail selectedBook={books?.data?.find((book) => book.id === selectedBookId)} />
        </Suspense>
      </Modal>
    </>
  );
}
