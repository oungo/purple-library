export interface IBook {
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

export interface IBookResponse {
  display: number;
  items: IBook[];
  lastBuildDate: string;
  start: number;
  total: number;
}
