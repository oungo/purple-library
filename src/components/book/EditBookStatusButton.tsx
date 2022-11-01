import { useBookInStockMutation } from '@/hooks/mutations/book';
import { colors } from '@/styles/color';
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import styled from 'styled-components';
import * as queryKeys from '@/utils/queryKeys';

const Button = styled.button`
  cursor: pointer;
  color: ${colors.brand};
`;

interface EditBookStatusButtonProps {
  id: number;
}

export default function EditBookStatusButton({ id }: EditBookStatusButtonProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate } = useBookInStockMutation({
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.BOOKS]);
    },
  });

  if (router.query.inStock === 'true') {
    return <Button>대여</Button>;
  }

  return <Button onClick={() => mutate(id)}>보유 도서로 이동</Button>;
}
