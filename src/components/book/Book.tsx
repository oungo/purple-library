import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import * as queryKeys from '@/utils/queryKeys';
import { getNBook } from '@/controller/book';
import { NBookResponse } from '@/types/book';
import { Loading } from '../common/Loading';
import BookInfo from './BookInfo';

export interface BookProps {
  book: NBookResponse;
}

export default function Book({ book }: BookProps) {
  const router = useRouter();
  const { id } = router.query;

  const { data, error, isFetching } = useQuery(
    [queryKeys.N_BOOK, id],
    () => getNBook(id as string),
    {
      enabled: !!id,
      initialData: book,
    }
  );

  if (isFetching) return <Loading />;
  if (!data || error) return null;

  return (
    <>
      {data.items.map((book) => {
        return <BookInfo key={book.isbn} book={book} />;
      })}
    </>
  );
}
