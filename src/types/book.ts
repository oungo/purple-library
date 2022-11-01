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
export type BookData = Omit<Book, 'id' | 'createdAt' | 'buyDate'>;
