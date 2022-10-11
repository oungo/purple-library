import Book from '@/components/Book';
import { getBook } from '@/controller/book';
import { IBookResponse } from '@/types/book';
import { GetServerSideProps } from 'next';

interface IBookInfoProps {
  book: IBookResponse;
}

export default function BookInfo({ book: initialData }: IBookInfoProps) {
  return <Book book={initialData} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return { props: { book: await getBook(context.query.id) } };
};
