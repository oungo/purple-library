import { supabase } from '@/utils/supabaseClient';
import { definitions } from '@/types/supabase';

export const getBook = async (id?: number) => {
  return supabase
    .from<definitions['book']>('book')
    .select('*', { count: 'exact' })
    .eq('id', id)
    .single();
};
