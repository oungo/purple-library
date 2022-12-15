import { SupabaseClient } from '@/types/common';
import { UpdateUserData } from '@/types/user';
import { PAGE_SIZE } from '@/utils/common';
import { ParsedUrlQuery } from 'querystring';

export const getUser = async (supabaseClient: SupabaseClient, id?: string) => {
  return supabaseClient.from('user').select('*').eq('uid', id).throwOnError().single();
};

export const getUsers = async (supabaseClient: SupabaseClient, query: ParsedUrlQuery = {}) => {
  let supabaseQuery = supabaseClient
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

  return supabaseQuery.range(start, end);
};

export const getAllUsers = async (supabaseClient: SupabaseClient) => {
  return supabaseClient
    .from('user')
    .select('*', { count: 'exact' })
    .order('name')
    .range(0, 100)
    .throwOnError();
};

export const updateUser = async (supabaseClient: SupabaseClient, values: UpdateUserData) => {
  return supabaseClient.from('user').update(values).eq('id', values.id).throwOnError();
};
