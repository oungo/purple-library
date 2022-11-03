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
  gap: 1rem;
`;

export interface IBookFormProps {
  book: Book;
}

export default function BookForm({ book }: IBookFormProps) {
  const queryClient = useQueryClient();

  const setIsOpen = useBoundStore((state) => state.setIsOpen);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { mutate } = useMutation<PostgrestResponse<any>, unknown, Partial<UpdateBookValues>>(
    (value) => updateBook(book.id, value),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.BOOKS]);
        setIsOpen(false);
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
        <input type="radio" name="inStock" value="true" defaultChecked={book.inStock} />
        보유중
      </label>
      <label>
        <input type="radio" name="inStock" value="false" defaultChecked={!book.inStock} />
        구매 예정
      </label>

      <SaveButton color="primary">저장</SaveButton>
    </Form>
  );
}
