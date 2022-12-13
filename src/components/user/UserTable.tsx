import { useQuery } from 'react-query';
import * as queryKeys from '@/utils/queryKeys';
import { getUsers } from 'api/user';
import { ColumnsType } from '@/types/common';
import { Table } from '../common/Table';
import styled from 'styled-components';
import * as modalIds from '@/utils/modalIds';
import { useState } from 'react';
import UserForm from './UserForm';
import Modal from '../common/Modal';
import { User } from '@/types/user';
import { useRouter } from 'next/router';
import Pagination from '../book/Pagination';
import { colors } from '@/styles/color';
import { useSupabaseClient } from '@/hooks/use-supabase-client';
import { formatDate } from '@/utils/common';

const UpdateButton = styled.button`
  color: ${colors.second};
`;

const columns: ColumnsType<User> = [
  {
    title: '이메일',
    dataIndex: 'email',
    width: '20%',
    align: 'center',
  },
  {
    title: '이름',
    dataIndex: 'name',
    width: '20%',
    align: 'center',
  },
  {
    title: '권한',
    dataIndex: 'role',
    width: '20%',
    align: 'center',
    render: (value) => (value === 'admin' ? '관리자' : '사용자'),
  },
  {
    title: '가입일',
    dataIndex: 'createdAt',
    width: '20%',
    align: 'center',
    render: (value: Date) => {
      return <div>{formatDate(new Date(value))}</div>;
    },
  },
];

export default function UserTable() {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const { data: users } = useQuery({
    queryKey: [queryKeys.USERS, router.query],
    queryFn: () => getUsers(supabaseClient, router.query),
    keepPreviousData: true,
  });

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleOpenModal = (userId: number) => {
    setSelectedUserId(userId);
  };

  const handleCloseModal = () => {
    setSelectedUserId(null);
  };
  const newColumns: ColumnsType<User> = [
    ...columns,
    {
      title: '',
      dataIndex: 'id',
      render: (value: number) => {
        return <UpdateButton onClick={() => handleOpenModal(value)}>수정</UpdateButton>;
      },
    },
  ];

  const selectedUser = users?.data?.find((user) => user.id === selectedUserId);

  return (
    <>
      <Table columns={newColumns} dataSource={users?.data || []} />

      <Pagination totalCount={users?.count ?? 0} />

      <Modal
        id={modalIds.USER_DETAIL}
        title="사용자 수정"
        visible={!!selectedUserId}
        closeModal={handleCloseModal}
      >
        {selectedUser && <UserForm selectedUser={selectedUser} closeModal={handleCloseModal} />}
      </Modal>
    </>
  );
}
