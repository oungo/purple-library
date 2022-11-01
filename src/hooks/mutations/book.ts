import { PostgrestResponse } from '@supabase/supabase-js';
import { updateBook } from 'api/books';
import { useMutation } from 'react-query';

export const useBookInStockMutation = (options = {}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useMutation<PostgrestResponse<any>, unknown, number>(
    (id) => updateBook(id, { inStock: true }),
    options
  );
};
