import { supabase } from '@/utils/supabaseClient';
import { PAGE_SIZE } from '../common';
import { ParsedUrlQuery } from 'querystring';

export const getBooks = async (query: ParsedUrlQuery) => {
  let supabaseQuery = supabase.from('book').select('*', { count: 'exact' });
  for (const [key, value] of Object.entries(query)) {
    if (key === 'page') continue;
    supabaseQuery = supabaseQuery.eq(key, value);
  }

  const start = (Number(query.page || 1) - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE - 1;

  return await supabaseQuery.range(start, end);
};
