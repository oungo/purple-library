import { GetServerSideProps } from 'next';
import Book from '../../components/Book';
import { getBook } from '../../controller/book';
import { IBookResponse } from '../../types/book';

interface IBookInfoProps {
  book: IBookResponse;
}

export default function BookInfo({ book: initialData }: IBookInfoProps) {
  return <Book book={initialData} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return { props: { book: await getBook(context.query.id) } };
};
