import { MouseEvent } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import Input from '../common/Input';
import Label from '../common/Label';
import BookCategorySelect from './BookCategorySelect';
import { useRouter } from 'next/router';
import * as queryKeys from '@/utils/queryKeys';
import { useBook } from './hooks/useBook';
import { BookInsertData } from '@/types/book';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { PostgrestResponse } from '@supabase/supabase-js';
import { addBook } from 'api/books';
import { useQueryClient, useMutation } from 'react-query';
import { useUser } from '@/hooks/use-user';
import { formatDate, getFormValue } from '@/utils/common';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  input,
  select {
    margin-left: 1rem;
  }
`;

interface AddBookFormProps {
  closeModal: () => void;
}

export default function AddBookForm({ closeModal }: AddBookFormProps) {
  const router = useRouter();
  const { data: book } = useBook(router.query.isbn as string);
  const { data: user } = useUser();

  const queryClient = useQueryClient();
  const supabaseClient = useSupabaseClient();

  const { mutate, isLoading } = useMutation<PostgrestResponse<undefined>, unknown, BookInsertData>({
    mutationFn: (value) => addBook(supabaseClient, value),
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.TO_PURCHASE_BOOK_COUNT]);
      closeModal();
      router.push('/book');
    },
  });

  const handleSubmit = (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    const bookData: BookInsertData = {
      title: book?.title || '',
      author: book?.author || '',
      publisher: book?.publisher || '',
      isbn: book?.isbn || '',
      image: book?.image || '',
      discount: Number(book?.discount),
      description: book?.description,
      isDeleted: false,
      buyer: user?.data?.name || user?.data?.email || '',
      ...getFormValue(e.target),
    };

    mutate(bookData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        구매 일자
        <Input type="date" name="buyDate" required defaultValue={formatDate(Date.now())} />
      </Label>

      <Label>
        분류
        <BookCategorySelect autoFocus name="category" />
      </Label>

      <Label>
        단가
        <Input type="number" name="discount" defaultValue={book?.discount} required />
      </Label>

      <Button buttonType="primary" loading={isLoading}>
        추가
      </Button>
    </Form>
  );
}
