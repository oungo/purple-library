import { Book } from '@/types/book';
import { supabase } from '../supabaseClient';

export const addBook = async (book: Partial<Book>) => {
  return await supabase.from('book').insert(book);
};
