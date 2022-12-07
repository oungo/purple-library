import { useUser } from '@supabase/auth-helpers-react';
import { useCurrentUser } from './queries/useCurrentUser';

export const useCheckAdmin = () => {
  const user = useUser();
  const { data: currentUser } = useCurrentUser(user?.id);

  return currentUser?.data?.role === 'admin';
};
