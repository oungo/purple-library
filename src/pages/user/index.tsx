import Loading from '@/components/common/Loading';
import { ErrorType } from '@/components/ErrorBoundary';
import { NextPageWithLayout } from 'pages/_app';
import { getLayout } from '@/components/layout/Layout';
import UserTable from '@/components/user/UserTable';
import { DehydratedStateProps } from '@/types/common';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { getServerSession, redirectLoginPage } from 'api/auth';
import { GetServerSideProps } from 'next';
import { QueryClient, dehydrate } from 'react-query';
import * as queryKeys from '@/utils/queryKeys';
import { getUser, getUsers } from 'api/user';
import ErrorComponent from '@/components/common/ErrorComponent';
import AsyncBoundary from '@/components/common/AsyncBoundary';

interface BookInfoProps {
  error: ErrorType;
}

const User: NextPageWithLayout<BookInfoProps> = ({ error }) => {
  if (error) return <ErrorComponent error={error} />;

  return (
    <AsyncBoundary
      loadingFallback={<Loading />}
      rejectedFallback={({ error }) => <ErrorComponent error={error} />}
    >
      <UserTable />
    </AsyncBoundary>
  );
};

export const getServerSideProps: GetServerSideProps<DehydratedStateProps> = async (context) => {
  const supabaseClient = createServerSupabaseClient(context);
  const session = await getServerSession(supabaseClient);

  if (!session) return redirectLoginPage();

  const queryClient = new QueryClient();

  let error = null;

  await queryClient
    .fetchQuery({
      queryKey: [queryKeys.USERS, context.query],
      queryFn: () => getUsers(supabaseClient, context.query),
    })
    .catch((err) => (error = err));

  const { data: user } = await queryClient
    .fetchQuery({
      queryKey: [queryKeys.USER, session.user.id],
      queryFn: () => getUser(supabaseClient, session.user.id),
    })
    .catch((err) => (error = err));

  if (user?.role !== 'admin') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      error,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

User.getLayout = getLayout;

export default User;
