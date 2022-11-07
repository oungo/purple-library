import { supabase } from '@/utils/supabaseClient';

export const getUser = async (uid: string) => {
  return supabase.from('user').select('role').eq('uid', uid).single();
};
