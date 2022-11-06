import Book from '@/components/book/Book';
import { getLayout } from '@/components/layout/Layout';
import { getNBook } from '@/controller/book';
import { NBookResponse } from '@/types/book';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSideProps } from 'next';
import { NextPageWithLayout } from 'pages/_app';

interface BookInfoProps {
  book: NBookResponse;
}

const BookInfo: NextPageWithLayout<BookInfoProps> = ({ book }) => {
  return <Book book={book} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const supabase = createServerSupabaseClient(context);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };

  return { props: { book: await getNBook(context.query.id as string) } };
};

BookInfo.getLayout = getLayout;

export default BookInfo;
