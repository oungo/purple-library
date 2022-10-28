import { useQuery } from 'react-query';
import BookForm from './BookForm';
import * as queryKeys from '@/utils/queryKeys';
import { getBook } from '@/utils/book/getBook';
import { useBoundStore } from '@/store/useBoundStore';
import Loading from '../common/Loading';

export default function BookModalContent() {
  const id = useBoundStore((state) => state.id);

  const { data: book, isLoading } = useQuery([queryKeys.BOOKS, id], () => getBook(id), {
    enabled: !!id,
  });

  if (isLoading) return <Loading />;
  if (!book?.data) return <>조회불가</>;

  return (
    <>
      <p>도서명 {book.data.title}</p>
      <p>저자 {book.data.author}</p>
      <p>출판사 {book.data.publisher}</p>

      <BookForm book={book.data} />
    </>
  );
}
