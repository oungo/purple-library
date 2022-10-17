import { supabase } from '@/utils/supabaseClient';
import { PAGE_SIZE } from '../common';

export const getBooks = async (page: number) => {
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE - 1;
  return await supabase.from('book').select('*', { count: 'exact' }).range(start, end);
};
