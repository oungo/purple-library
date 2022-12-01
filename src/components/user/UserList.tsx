import { useQuery } from 'react-query';
import * as queryKeys from '@/utils/queryKeys';
import { getUsers } from 'api/user';
import { ColumnsType } from '@/types/common';
import { Table } from '../common/Table';

const columns: ColumnsType = [
  {
    title: 'id',
    dataIndex: 'id',
  },
  {
    title: '이메일',
    dataIndex: 'email',
  },
  {
    title: '이름',
    dataIndex: 'name',
  },
  {
    title: '권한',
    dataIndex: 'role',
  },
  {
    title: '가입일',
    dataIndex: 'created_at',
    render: (value: Date) => {
      const date = new Date(value);
      const intl = new Intl.DateTimeFormat('ko');
      return <div>{intl.format(date)}</div>;
    },
  },
];

export default function UserList() {
  const { data: users } = useQuery([queryKeys.USERS], getUsers);

  return <Table columns={columns} dataSource={users?.data || []} />;
}
