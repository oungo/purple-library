import * as queryKeys from '@/utils/queryKeys';
import { useMutation, useQueryClient } from 'react-query';
import { PostgrestResponse } from '@supabase/supabase-js';
import { Book } from '@/types/book';
import { useBoundStore } from '@/store/useBoundStore';
import { updateBook, UpdateBookValues } from 'api/books';
import Button from '../common/Button';
import styled from 'styled-components';

const SaveButton = styled(Button)`
  position: absolute;
  display: block;
  bottom: 0;
  right: 0;
  margin: 1rem;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  input {
    margin-left: 1rem;
  }
`;

export interface IBookFormProps {
  book: Book;
}

export default function BookForm({ book }: IBookFormProps) {
  const queryClient = useQueryClient();

  const setSelectedBookId = useBoundStore((state) => state.setSelectedBookId);

  const { mutate } = useMutation<PostgrestResponse<undefined>, unknown, Partial<UpdateBookValues>>(
    (value) => updateBook(book.id, value),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.BOOKS]);
        setSelectedBookId(0);
      },
    }
  );

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    const values = Object.fromEntries(new FormData(e.target as HTMLFormElement));
    mutate(values);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <label>
        구매자
        <input name="buyer" defaultValue={book.buyer || ''} />
      </label>
      <label>
        보유자
        <input name="lender" defaultValue={book.lender || ''} />
      </label>

      <SaveButton color="primary">저장</SaveButton>
    </Form>
  );
}
