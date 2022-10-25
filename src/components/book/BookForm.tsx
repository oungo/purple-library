import * as queryKeys from '@/utils/queryKeys';
import { updateBook, UpdateBookValues } from '@/utils/book/updateBook';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { PostgrestResponse } from '@supabase/supabase-js';
import { useModalStore } from '@/store/useModalStore';
import { Book } from '@/types/book';

export interface IBookFormProps {
  book: Book;
}

export default function BookForm({ book }: IBookFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { close } = useModalStore();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { mutate } = useMutation<PostgrestResponse<any>, unknown, Partial<UpdateBookValues>>(
    (value) => updateBook(book.id, value),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.BOOKS, router.query]);
        close();
      },
    }
  );

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    const values = Object.fromEntries(new FormData(e.target as HTMLFormElement));
    mutate(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input type="radio" name="inStock" value="true" defaultChecked={book.inStock} />
        보유중
      </label>
      <label>
        <input type="radio" name="inStock" value="false" defaultChecked={!book.inStock} />
        구매 예정
      </label>

      <button>저장</button>
    </form>
  );
}
