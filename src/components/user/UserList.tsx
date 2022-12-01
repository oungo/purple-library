import { useQuery } from 'react-query';
import * as queryKeys from '@/utils/queryKeys';
import { getUsers } from 'api/user';
import { ColumnsType } from '@/types/common';
import { Table } from '../common/Table';
import styled from 'styled-components';
import { USER_MODAL_ID } from '@/utils/common';
import ModalPortal from '../common/ModalPortal';
import { useState } from 'react';
import UserModal from './UserModal';

const Container = styled.section`
  padding: 0 100px;
`;

const columns: ColumnsType = [
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
      const intl = new Intl.DateTimeFormat('ko');
      return <div>{intl.format(date)}</div>;
    },
  },
];

export default function UserList() {
  const { data: users } = useQuery([queryKeys.USERS], getUsers);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleOpenModal = (userId: number) => {
    setSelectedUserId(userId);
  };

  const newColumns: ColumnsType = [
    ...columns,
    {
      title: '',
      dataIndex: 'id',
      render: (value: number) => {
        return <button onClick={() => handleOpenModal(value)}>수정</button>;
      },
    },
  ];

  return (
    <Container>
      <Table columns={newColumns} dataSource={users?.data || []} />

      <div id={USER_MODAL_ID} />
      {selectedUserId && (
        <ModalPortal id={USER_MODAL_ID}>
          <UserModal
            selectedUser={users?.data?.find((user) => user.id === selectedUserId)}
            closeModal={() => setSelectedUserId(null)}
          />
        </ModalPortal>
      )}
    </Container>
  );
}
