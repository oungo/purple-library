import { BookInsertData, BookUpdateData } from '@/types/book';
import { SupabaseClient } from '@/types/common';
import { PAGE_SIZE } from '@/utils/common';
import { ParsedUrlQuery } from 'querystring';

export const getBooks = async (supabaseClient: SupabaseClient, query: ParsedUrlQuery = {}) => {
  let supabaseQuery = supabaseClient
    .from('book')
    .select('*', { count: 'exact' })
    .order('id', { ascending: false })
    .eq('isDeleted', false)
    .throwOnError();

  for (const [key, value] of Object.entries(query)) {
    if (key === 'page') continue;
    if (key === 'title') {
      supabaseQuery = supabaseQuery.like(key, `%${value}%`);
    } else {
      supabaseQuery = supabaseQuery.eq(key, value as string);
    }
  }

  const start = (Number(query.page || 1) - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE - 1;

  return supabaseQuery.range(start, end);
};

export const addBook = async (supabaseClient: SupabaseClient, book: BookInsertData) => {
  return supabaseClient.from('book').insert(book).throwOnError();
};

export const updateBook = async (supabaseClient: SupabaseClient, values: BookUpdateData) => {
  return supabaseClient.from('book').update(values).eq('id', values.id).throwOnError();
};

export const getToPurchaseBookCount = async (supabaseClient: SupabaseClient, isbn: string) => {
  return supabaseClient
    .from('book')
    .select('id', { count: 'exact' })
    .eq('isbn', isbn)
    .eq('inStock', false)
    .throwOnError();
};

export const getStockBookCount = async (supabaseClient: SupabaseClient, isbn: string) => {
  return supabaseClient
    .from('book')
    .select('id', { count: 'exact' })
    .eq('isbn', isbn)
    .eq('inStock', true)
    .throwOnError();
};
