import { BookData } from '@/types/book';
import { PAGE_SIZE } from '@/utils/common';
import { supabase } from '@/utils/supabaseClient';
import { ParsedUrlQuery } from 'querystring';

export interface UpdateBookValues {
  inStock: boolean;
}

export const getBooks = async (query: ParsedUrlQuery = {}) => {
  let supabaseQuery = supabase
    .from('book')
    .select('*', { count: 'exact' })
    .order('id', { ascending: false });

  for (const [key, value] of Object.entries(query)) {
    if (key === 'page') continue;
    supabaseQuery = supabaseQuery.eq(key, value as string);
  }

  const start = (Number(query.page || 1) - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE - 1;

  return await supabaseQuery.range(start, end);
};

export const getBook = async (id?: number) => {
  return supabase.from('book').select('*', { count: 'exact' }).eq('id', id).single();
};

export const addBook = async (book: BookData) => {
  return await supabase.from('book').insert(book);
};

export const updateBook = async (id: number, values: Partial<UpdateBookValues>) => {
  return await supabase.from('book').update(values).eq('id', id);
};

export const deleteBook = async (id: number) => {
  return await supabase.from('book').delete().eq('id', id);
};

export const getToPurchaseBookCount = async (isbn: string) => {
  return await supabase.from('book').select('id').eq('isbn', isbn).eq('inStock', false);
};

export const getStockBookCount = async (isbn: string) => {
  return await supabase.from('book').select('id').eq('isbn', isbn).eq('inStock', true);
};
