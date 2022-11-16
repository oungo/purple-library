import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import * as queryKeys from '@/utils/queryKeys';
import { getNBook } from '@/controller/book';
import BookInfo from './BookInfo';

export default function Book() {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useQuery([queryKeys.N_BOOK, id], () => getNBook(id as string), {
    enabled: !!id,
  });

  return (
    <>
      {data?.items.map((book) => {
        return <BookInfo key={book.isbn} book={book} />;
      })}
    </>
  );
}
