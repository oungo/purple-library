import { useQuery } from 'react-query';
import * as queryKeys from '@/utils/queryKeys';
import { getUser } from 'api/user';
import { useSupabaseClient } from '../use-supabase-client';

export const useCurrentUser = (userId?: string) => {
  const supabaseClient = useSupabaseClient();
  return useQuery({
    queryKey: [queryKeys.USER, userId],
    queryFn: () => getUser(supabaseClient, userId),
    enabled: !!userId,
  });
};
