import { useUser as originUseUser } from '@supabase/auth-helpers-react';
import { useCurrentUser } from './queries/useCurrentUser';

export const useUser = () => {
  const user = originUseUser();
  return useCurrentUser(user?.id);
};
