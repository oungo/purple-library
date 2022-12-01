import { useQuery } from 'react-query';
import * as queryKeys from '@/utils/queryKeys';
import { getUsers } from 'api/user';
import { ColumnsType } from '@/types/common';
import { Table } from '../common/Table';
import styled from 'styled-components';

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

  return (
    <Container>
      <Table columns={columns} dataSource={users?.data || []} />
    </Container>
  );
}
