import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import * as queryKeys from '@/utils/queryKeys';
import { getNBook } from '@/controller/book';
import BookInfo from './BookInfo';

export default function Book() {
  const router = useRouter();
  const { isbn } = router.query;

  const { data } = useQuery([queryKeys.N_BOOK, isbn], () => getNBook(isbn as string), {
    enabled: !!isbn,
  });

  return (
    <>
      {data?.items.map((book) => {
        return <BookInfo key={book.isbn} book={book} />;
      })}
    </>
  );
}
