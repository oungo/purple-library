import { BookClient } from '@/types/book';

export const getServerSession = async (supabaseClient: BookClient) => {
  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  return session;
};

export const redirectLoginPage = () => ({
  redirect: {
    destination: '/login',
    permanent: false,
  },
});
