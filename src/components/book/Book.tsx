import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import * as queryKeys from '@/utils/queryKeys';
import BookInfo from './BookInfo';
import { getNBook } from 'api/naverBook';

export default function Book() {
  const { isbn } = useRouter().query;

  const { data: book } = useQuery([queryKeys.NAVER_BOOK, isbn], () => getNBook(isbn as string), {
    enabled: !!isbn,
  });

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return <BookInfo key={book?.isbn} book={book!} />;
}
