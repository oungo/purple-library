import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Label from '@/components/common/Label';
import { UpdateUserData } from '@/types/user';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { PostgrestResponse } from '@supabase/supabase-js';
import * as queryKeys from '@/utils/queryKeys';
import { getUser, updateUser } from 'api/user';
import { MouseEvent } from 'react';
import { dehydrate, QueryClient, useMutation } from 'react-query';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { DehydratedStateProps } from '@/types/common';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { getServerSession, redirectLoginPage } from 'api/auth';
import { GetServerSideProps } from 'next';
import { useUser } from '@/hooks/use-user';

const Form = styled.form`
  width: 300px;
  margin: auto;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Index = () => {
  const router = useRouter();
  const { data: user } = useUser();
  const supabaseClient = useSupabaseClient();

  const { mutate, isLoading } = useMutation<PostgrestResponse<unknown>, unknown, UpdateUserData>({
    mutationFn: (value) => updateUser(supabaseClient, value),
    onSuccess: () => {
      router.push('/book');
    },
  });

  const handleSubmit = (e: MouseEvent<HTMLFormElement>) => {
    const values = Object.fromEntries(new FormData(e.target as HTMLFormElement));
    mutate({ id: user?.data?.id, ...values });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>사용자 이름 등록 후 이용해주세요.</Label>
      <Input type="text" name="name" required />
      <Button loading={isLoading} buttonType="primary">
        등록
      </Button>
    </Form>
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
      queryKey: [queryKeys.USER],
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
