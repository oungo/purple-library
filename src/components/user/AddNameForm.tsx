import { useUser } from '@/hooks/use-user';
import { UpdateUserData } from '@/types/user';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { PostgrestResponse } from '@supabase/supabase-js';
import { updateUser } from 'api/user';
import { useRouter } from 'next/router';
import { MouseEvent } from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import Button from '../common/Button';
import Input from '../common/Input';
import Label from '../common/Label';

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

export default function AddNameForm() {
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
    e.preventDefault();
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
}
