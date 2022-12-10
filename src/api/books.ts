import { BookData, PartialBook } from '@/types/book';
import { PAGE_SIZE } from '@/utils/common';
import { supabase } from '@/utils/supabaseClient';
import { ParsedUrlQuery } from 'querystring';
import { SupabaseClient } from '@supabase/supabase-js';

export interface UpdateBookValues {
  id: number;
  inStock: boolean;
}

export const getBooks = async (supabaseClient: SupabaseClient, query: ParsedUrlQuery = {}) => {
  let supabaseQuery = supabaseClient
    .from('book')
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

export const getBook = async (id?: number) => {
  return supabase.from('book').select('*', { count: 'exact' }).eq('id', id).throwOnError().single();
};

export const addBook = async (book: BookData) => {
  return supabase.from('book').insert(book).throwOnError();
};

export const updateBook = async (values: PartialBook) => {
  return supabase.from('book').update(values).eq('id', values.id).throwOnError();
};

export const deleteBook = async (id: number) => {
  return supabase.from('book').delete().eq('id', id).throwOnError();
};

export const getToPurchaseBookCount = async (isbn: string) => {
  return supabase
    .from('book')
    .select('id', { count: 'exact' })
    .eq('isbn', isbn)
    .eq('inStock', false)
    .throwOnError();
};

export const getStockBookCount = async (isbn: string) => {
  return supabase
    .from('book')
    .select('id', { count: 'exact' })
    .eq('isbn', isbn)
    .eq('inStock', true)
    .throwOnError();
};
