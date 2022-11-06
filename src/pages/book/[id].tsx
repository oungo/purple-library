import Book from '@/components/book/Book';
import { getLayout } from '@/components/layout/Layout';
import { getNBook } from '@/controller/book';
import { NBookResponse } from '@/types/book';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { getServerSession, redirect } from 'api/auth';
import { GetServerSideProps } from 'next';
import { NextPageWithLayout } from 'pages/_app';

interface BookInfoProps {
  book: NBookResponse;
}

const BookInfo: NextPageWithLayout<BookInfoProps> = ({ book }) => {
  return <Book book={book} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const supabaseClient = createServerSupabaseClient(context);
  const session = await getServerSession(supabaseClient);

  if (!session) return redirect();

  return { props: { book: await getNBook(context.query.id as string) } };
};

BookInfo.getLayout = getLayout;

export default BookInfo;
