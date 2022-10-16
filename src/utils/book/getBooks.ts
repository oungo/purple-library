import { supabase } from '@/utils/supabaseClient';

export const getBooks = async () => {
  return await supabase.from('book').select('*', { count: 'exact' }).range(0, 19);
};
