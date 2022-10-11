import { getBooks } from '@/controller/book';
import { useQuery } from 'react-query';
import * as queryKeys from '@/utils/queryKeys';

export const useSearchResult = (keyword: string) => {
  return useQuery([queryKeys.N_BOOKS, keyword], () => getBooks(keyword), {
    enabled: !!keyword,
  });
};
