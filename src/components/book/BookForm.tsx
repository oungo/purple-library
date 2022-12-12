import * as queryKeys from '@/utils/queryKeys';
import { useMutation, useQueryClient } from 'react-query';
import { PostgrestResponse } from '@supabase/supabase-js';
import { Book, BookUpdateData } from '@/types/book';
import { useBoundStore } from '@/store/useBoundStore';
import { updateBook } from 'api/books';
import Button from '../common/Button';
import styled from 'styled-components';
import Label from '../common/Label';
import { useSupabaseClient } from '@/hooks/use-supabase-client';
import UserSelect from './UserSelect';

const Container = styled.div`
  margin-top: 1rem;
`;
const ButtonWrapper = styled.div`
  margin-left: auto;
`;
const SaveButton = styled(Button)`
  margin-right: 1rem;
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

export interface IBookFormProps {
  book: Book;
}

export default function BookForm({ book }: IBookFormProps) {
  const queryClient = useQueryClient();
  const supabaseClient = useSupabaseClient();

  const setSelectedBookId = useBoundStore((state) => state.setSelectedBookId);

  const { mutate, isLoading } = useMutation<PostgrestResponse<undefined>, unknown, BookUpdateData>({
    mutationFn: (value) => updateBook(supabaseClient, value),
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.BOOKS]);
      setSelectedBookId(null);
    },
  });

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    const values = Object.fromEntries(new FormData(e.target as HTMLFormElement));
    mutate({ id: book.id, ...values });
  };

  const handleDelete = () => {
    if (confirm(`도서명: ${book.title} \n해당 책을 정말 삭제하시겠습니까?`)) {
      mutate({ id: book.id, isDeleted: true });
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="buyer">
          구매자
          <UserSelect name="buyer" defaultValue={book.buyer || ''} />
        </Label>
        <Label htmlFor="lender">
          보유자
          <UserSelect
            name="lender"
            defaultValue={book.lender || ''}
            defaultOption={<option value="">공용서가</option>}
          />
        </Label>

        <ButtonWrapper>
          <SaveButton loading={isLoading} buttonType="primary">
            저장
          </SaveButton>
          <Button type="button" onClick={handleDelete}>
            삭제
          </Button>
        </ButtonWrapper>
      </Form>
    </Container>
  );
}
