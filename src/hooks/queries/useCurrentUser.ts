import { useQuery } from 'react-query';
import * as queryKeys from '@/utils/queryKeys';
import { getUser } from 'api/user';

export const useCurrentUser = (userId?: string) => {
  return useQuery([queryKeys.USER], () => getUser(userId), {
    enabled: !!userId,
  });
};
