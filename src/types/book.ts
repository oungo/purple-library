export interface Book {
  author: string;
  title: string;
  description: string;
  discount: string;
  image: string;
  isbn: string;
  pubdate: string;
  publisher: string;
  link: string;
}

export interface BookResponse {
  display: number;
  items: Book[];
  lastBuildDate: string;
  start: number;
  total: number;
}

export type BookDTO = Pick<Book, 'title' | 'author' | 'publisher' | 'isbn'>;
