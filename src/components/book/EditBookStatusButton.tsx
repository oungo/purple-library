import { useBookMutation } from '@/hooks/mutations/book';
import { colors } from '@/styles/color';
import { useQueryClient } from 'react-query';
import styled from 'styled-components';
import * as queryKeys from '@/utils/queryKeys';
import { useUser } from '@supabase/auth-helpers-react';

const Button = styled.button`
  cursor: pointer;
  color: ${colors.brand};
`;

interface EditBookStatusButtonProps {
  id: number;
  inStock: boolean;
}

export default function EditBookStatusButton({ id, inStock }: EditBookStatusButtonProps) {
  const user = useUser();
  const queryClient = useQueryClient();

  const { mutate } = useBookMutation(id, {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.BOOKS]);
    },
  });

  if (inStock) {
    return <Button onClick={() => mutate({ lender: user?.email })}>대여</Button>;
  }

  return <Button onClick={() => mutate({ inStock: true })}>보유 도서로 이동</Button>;
}
