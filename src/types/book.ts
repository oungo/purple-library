export interface NBookResponse {
  display: number;
  items: NBook[];
  lastBuildDate: string;
  start: number;
  total: number;
}

export interface DefaultBook {
  title: string;
  author: string;
  isbn: string;
  publisher: string;
}

export interface NBook extends DefaultBook {
  description: string;
  discount: string;
  image: string;
  pubdate: string;
  link: string;
}

export interface LibraryBook extends DefaultBook {
  inStock: boolean;
}
