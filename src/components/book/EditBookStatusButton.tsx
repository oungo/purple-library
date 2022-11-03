import { useBookMutation } from '@/hooks/mutations/book';
import { colors } from '@/styles/color';
import { useQueryClient } from 'react-query';
import styled from 'styled-components';
import * as queryKeys from '@/utils/queryKeys';

const Button = styled.button`
  cursor: pointer;
  color: ${colors.brand};
`;

interface EditBookStatusButtonProps {
  id: number;
  inStock: boolean;
}

export default function EditBookStatusButton({ id, inStock }: EditBookStatusButtonProps) {
  const queryClient = useQueryClient();

  const { mutate } = useBookMutation(id, {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.BOOKS]);
    },
  });

  if (inStock) {
    return <Button>대여</Button>;
  }

  return <Button onClick={() => mutate({ inStock: true })}>보유 도서로 이동</Button>;
}
