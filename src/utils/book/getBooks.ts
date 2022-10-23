import { supabase } from '@/utils/supabaseClient';
import { PAGE_SIZE } from '../common';
import { ParsedUrlQuery } from 'querystring';

export const getBooks = async (query: ParsedUrlQuery) => {
  const start = (Number(query.page || 1) - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE - 1;
  return await supabase.from('book').select('*', { count: 'exact' }).range(start, end);
};
