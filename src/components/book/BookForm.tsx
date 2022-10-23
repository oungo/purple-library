import { definitions } from '@/types/supabase';
import { PostgrestSingleResponse } from '@supabase/supabase-js';

export interface IBookFormProps {
  book: PostgrestSingleResponse<definitions['book']>;
}

export default function BookForm({ book }: IBookFormProps) {
  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(123);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="owned">
        <input
          type="radio"
          id="owned"
          name="inStock"
          value="true"
          defaultChecked={book.data?.inStock}
        />
        보유중
      </label>
      <label htmlFor="notOwned">
        <input
          type="radio"
          id="notOwned"
          name="inStock"
          value="false"
          defaultChecked={!book.data?.inStock}
        />
        구매 예정
      </label>

      <button>저장</button>
    </form>
  );
}
