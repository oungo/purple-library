import { useQuery } from 'react-query';
import * as queryKeys from '@/utils/queryKeys';
import { getUsers } from 'api/user';
import { useSupabaseClient } from '@/hooks/use-supabase-client';
import { ReactNode, SelectHTMLAttributes } from 'react';

interface UserSelectProps extends SelectHTMLAttributes<HTMLElement> {
  defaultOption?: ReactNode;
}

export default function UserSelect({ defaultOption, ...props }: UserSelectProps) {
  const supabaseClient = useSupabaseClient();

  const { data: users } = useQuery({
    queryKey: [queryKeys.USERS],
    queryFn: () => getUsers(supabaseClient),
    keepPreviousData: true,
  });

  return (
    <select {...props}>
      {defaultOption}
      {users?.data?.map((user) => (
        <option key={user.id} value={user.name || user.email || ''}>
          {user.name || user.email}
        </option>
      ))}
    </select>
  );
}
