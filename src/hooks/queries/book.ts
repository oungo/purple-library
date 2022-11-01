import { getBooks } from 'api/books';
import { useQuery } from 'react-query';
import * as queryKeys from '@/utils/queryKeys';
import { ParsedUrlQuery } from 'querystring';

export const useBooks = (query: ParsedUrlQuery) => {
  return useQuery([queryKeys.BOOKS, query], () => getBooks(query), {
    keepPreviousData: true,
  });
};
