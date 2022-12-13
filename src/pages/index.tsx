import * as queryKeys from '@/utils/queryKeys';
import { getUser } from 'api/user';
import { dehydrate, QueryClient } from 'react-query';
import { DehydratedStateProps } from '@/types/common';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { getServerSession, redirectLoginPage } from 'api/auth';
import { GetServerSideProps } from 'next';
import Loading from '@/components/common/Loading';
import SSRSafeSuspence from '@/components/SSRSafeSuspense';
import ErrorBoundary from '@/components/ErrorBoundary';
import ErrorComponent from '@/components/common/ErrorComponent';
import AddNameForm from '@/components/user/AddNameForm';

const Index = () => {
  return (
    <ErrorBoundary renderFallback={({ error }) => <ErrorComponent error={error} />}>
      <SSRSafeSuspence fallback={<Loading />}>
        <AddNameForm />
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

  const { data: user } = await queryClient
    .fetchQuery({
      queryKey: [queryKeys.USER, session.user.id],
      queryFn: () => getUser(supabaseClient, session.user.id),
    })
    .catch((err) => (error = err));

  if (user?.name) {
    return {
      redirect: {
        destination: '/book',
        permanent: false,
      },
    };
  }

  return {
    props: { error, dehydratedState: dehydrate(queryClient) },
  };
};

export default Index;
