import { PartialUser } from '@/types/user';
import { supabase } from '@/utils/supabaseClient';

export const getUser = async (uid?: string) => {
  return supabase.from('user').select('*').eq('uid', uid).throwOnError().single();
};

export const getUsers = async () => {
  return supabase.from('user').select('*').throwOnError();
};

export const updateUser = async (values: PartialUser) => {
  return supabase.from('user').update(values).eq('id', values.id).throwOnError();
};
