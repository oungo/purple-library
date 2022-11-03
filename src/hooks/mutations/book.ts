import { PartialBook } from '@/types/book';
import { PostgrestResponse } from '@supabase/supabase-js';
import { updateBook } from 'api/books';
import { useMutation, UseMutationOptions } from 'react-query';

type MutationOptions = Omit<
  UseMutationOptions<PostgrestResponse<undefined>, unknown, PartialBook, unknown>,
  'mutationFn'
>;

export const useBookMutation = (id: number, options?: MutationOptions) => {
  return useMutation<PostgrestResponse<undefined>, unknown, PartialBook>(
    (value) => updateBook(id, value),
    options
  );
};
