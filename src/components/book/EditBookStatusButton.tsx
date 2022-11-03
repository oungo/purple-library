import { useBookMutation } from '@/hooks/mutations/book';
import { colors } from '@/styles/color';
import { useQueryClient } from 'react-query';
import styled from 'styled-components';
import * as queryKeys from '@/utils/queryKeys';
import { useUser } from '@supabase/auth-helpers-react';
import { Book } from '@/types/book';

interface ButtonProps {
  action: 'lend' | 'return' | 'own';
}
const Button = styled.button<ButtonProps>`
  cursor: pointer;
  color: ${(props) => {
    switch (props.action) {
      case 'lend':
        return colors.primary;
      case 'return':
        return colors.fourth;
      case 'own':
        return colors.second;
      default:
        return;
    }
  }};
`;

interface EditBookStatusButtonProps {
  id: number;
  inStock: boolean;
  lender?: Book['lender'];
}

export default function EditBookStatusButton({ id, inStock, lender }: EditBookStatusButtonProps) {
  const user = useUser();
  const queryClient = useQueryClient();

  const { mutate } = useBookMutation(id, {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.BOOKS]);
    },
  });

  if (inStock) {
    if (user?.email === lender) {
      return (
        <Button action="return" onClick={() => mutate({ lender: '' })}>
          반납
        </Button>
      );
    }
    return (
      <Button action="lend" onClick={() => mutate({ lender: user?.email })}>
        대여
      </Button>
    );
  }

  return (
    <Button action="own" onClick={() => mutate({ inStock: true })}>
      보유 도서로 이동
    </Button>
  );
}
