import Book from '@/components/Book';
import { getBook } from '@/controller/book';
import { BookResponse } from '@/types/book';
import { GetServerSideProps } from 'next';

interface BookInfoProps {
  book: BookResponse;
}

export default function BookInfo({ book: initialData }: BookInfoProps) {
  return <Book book={initialData} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return { props: { book: await getBook(context.query.id) } };
};
