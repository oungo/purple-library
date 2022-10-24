import Book from '@/components/book/Book';
import { getNBook } from '@/controller/book';
import { NBookResponse } from '@/types/book';
import { GetServerSideProps } from 'next';

interface BookInfoProps {
  book: NBookResponse;
}

export default function BookInfo({ book: initialData }: BookInfoProps) {
  return <Book book={initialData} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return { props: { book: await getNBook(context.query.id as string) } };
};
