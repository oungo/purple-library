import Loading from '@/components/common/Loading';
import ErrorBoundary, { ErrorType } from '@/components/ErrorBoundary';
import SSRSafeSuspence from '@/components/SSRSafeSuspense';
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

interface BookInfoProps {
  error: ErrorType;
}

const User: NextPageWithLayout<BookInfoProps> = ({ error }) => {
  if (error) return <ErrorComponent error={error} />;

  return (
    <ErrorBoundary renderFallback={({ error }) => <ErrorComponent error={error} />}>
      <SSRSafeSuspence fallback={<Loading />}>
        <UserTable />
      </SSRSafeSuspence>
    </ErrorBoundary>
  );
};

export const getServerSideProps: GetServerSideProps<DehydratedStateProps> = async (context) => {
  const supabaseClient = createServerSupabaseClient(context);
  const session = await getServerSession(supabaseClient);

  if (!session) return redirectLoginPage();

  const queryClient = new QueryClient();

  let error = null;

  await queryClient
    .fetchQuery([queryKeys.USERS], () => getUsers(context.query))
    .catch((err) => (error = err));

  const { data: user } = await queryClient
    .fetchQuery([queryKeys.USER], () => getUser(session.user.id))
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
