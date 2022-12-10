import { useSupabaseClient as OriginUseSupabaseClient } from '@supabase/auth-helpers-react';
import { Database } from '@/types/database';

export const useSupabaseClient = () => {
  return OriginUseSupabaseClient<Database>();
};
