import { supabase } from '@/utils/supabaseClient';
import { PAGE_SIZE } from '../common';
import { ParsedUrlQuery } from 'querystring';
import { definitions } from '@/types/supabase';
import { LibraryBook } from '@/types/book';

export const getBooks = async (query: ParsedUrlQuery) => {
  let supabaseQuery = supabase.from<definitions['book']>('book').select('*', { count: 'exact' });
  for (const [key, value] of Object.entries(query)) {
    if (key === 'page') continue;
    supabaseQuery = supabaseQuery.eq(key as keyof LibraryBook, value as string);
  }

  const start = (Number(query.page || 1) - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE - 1;

  return await supabaseQuery.range(start, end);
};
