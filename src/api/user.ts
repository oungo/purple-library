import { PartialUser } from '@/types/user';
import { PAGE_SIZE } from '@/utils/common';
import { supabase } from '@/utils/supabaseClient';
import { ParsedUrlQuery } from 'querystring';

export const getUser = async (uid?: string) => {
  return supabase.from('user').select('*').eq('uid', uid).throwOnError().single();
};

export const getUsers = async (query: ParsedUrlQuery = {}) => {
  let supabaseQuery = supabase
    .from('user')
    .select('*', { count: 'exact' })
    .order('id', { ascending: false })
    .throwOnError();

  for (const [key, value] of Object.entries(query)) {
    if (key === 'page') continue;
    supabaseQuery = supabaseQuery.eq(key, value as string);
  }

  const start = (Number(query.page || 1) - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE - 1;

  return await supabaseQuery.range(start, end);
};

export const updateUser = async (values: PartialUser) => {
  return supabase.from('user').update(values).eq('id', values.id).throwOnError();
};
