import React, { MouseEvent } from 'react';
import { UpdateUserData, User } from '@/types/user';
import Input from '../common/Input';
import Label from '../common/Label';
import Button from '../common/Button';
import styled from 'styled-components';
import * as queryKeys from '@/utils/queryKeys';
import { useMutation, useQueryClient } from 'react-query';
import { PostgrestResponse } from '@supabase/supabase-js';
import { updateUser } from 'api/user';
import { useSupabaseClient } from '@/hooks/use-supabase-client';

const Dl = styled.dl`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  input,
  select {
    margin-left: 1rem;
  }
`;

interface UserModalProps {
  selectedUser: User;
  closeModal: () => void;
}

export default function UserForm({ selectedUser, closeModal }: UserModalProps) {
  const queryClient = useQueryClient();
  const supabaseClient = useSupabaseClient();

  const handleSubmit = (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    const values = Object.fromEntries(new FormData(e.target as HTMLFormElement));
    mutate({ id: selectedUser.id, ...values });
  };

  const { mutate, isLoading } = useMutation<PostgrestResponse<unknown>, unknown, UpdateUserData>({
    mutationFn: (value) => updateUser(supabaseClient, value),
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.USERS]);
      closeModal();
    },
  });

  return (
    <>
      <Dl>
        <dt>이메일</dt>
        <dd>{selectedUser?.email}</dd>
      </Dl>

      <Form onSubmit={handleSubmit}>
        <Label htmlFor="name">
          이름
          <Input name="name" id="name" placeholder="이름" defaultValue={selectedUser?.name || ''} />
        </Label>

        <Label htmlFor="role">
          권한
          <select name="role" id="role" defaultValue={selectedUser?.role || ''}>
            <option value="admin">관리자</option>
            <option value="user">사용자</option>
          </select>
        </Label>

        <Button loading={isLoading} buttonType="primary">
          저장
        </Button>
      </Form>
    </>
  );
}
