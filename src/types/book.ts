import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from './database';

export interface NBookResponse {
  display: number;
  items: NBook[];
  lastBuildDate: string;
  start: number;
  total: number;
}

export interface NBook {
  title: string;
  author: string;
  isbn: string;
  publisher: string;
  description: string;
  discount: string;
  image: string;
  pubdate: string;
  link: string;
}

export type Book = Database['public']['Tables']['book']['Row'];
export type BookInsertData = Database['public']['Tables']['book']['Insert'];
export type BookUpdateData = Database['public']['Tables']['book']['Update'];

export type BookClient = SupabaseClient<Database>;
