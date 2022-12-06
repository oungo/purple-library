import { useQuery } from 'react-query';
import * as queryKeys from '@/utils/queryKeys';
import { getUsers } from 'api/user';
import { ColumnsType } from '@/types/common';
import { Table } from '../common/Table';
import styled from 'styled-components';
import { USER_MODAL_ID } from '@/utils/common';
import { useState } from 'react';
import UserForm from './UserForm';
import Modal from '../common/Modal';
import { User } from '@/types/user';
import { useRouter } from 'next/router';
import Pagination from '../book/Pagination';
import { colors } from '@/styles/color';

const Container = styled.section`
  padding: 0 100px;
`;
const UpdateButton = styled.button`
  color: ${colors.second};
`;

const columns: ColumnsType<User> = [
  {
    title: 'id',
    dataIndex: 'id',
    width: '10%',
    align: 'center',
  },
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
  },
  {
    title: '가입일',
    dataIndex: 'created_at',
    width: '20%',
    align: 'center',
    render: (value: Date) => {
      const date = new Date(value);
      const intl = new Intl.DateTimeFormat('ko', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
      });
      return <div>{intl.format(date)}</div>;
    },
  },
];

export default function UserTable() {
  const router = useRouter();

  const { data: users } = useQuery([queryKeys.USERS], () => getUsers(router.query), {
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
    <Container>
      <Table columns={newColumns} dataSource={users?.data || []} />

      <Pagination totalCount={users?.count ?? 0} />

      <Modal
        id={USER_MODAL_ID}
        title="사용자 수정"
        visible={!!selectedUserId}
        closeModal={handleCloseModal}
      >
        {selectedUser && <UserForm selectedUser={selectedUser} closeModal={handleCloseModal} />}
      </Modal>
    </Container>
  );
}
