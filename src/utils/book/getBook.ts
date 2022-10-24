import { Book } from '@/types/book';
import { supabase } from '@/utils/supabaseClient';

export const getBook = async (id?: number) => {
  return supabase.from<Book>('book').select('*', { count: 'exact' }).eq('id', id).single();
};
