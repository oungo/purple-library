import { getNBook } from 'api/naverBook';
import { useQuery } from 'react-query';
import * as queryKeys from 'utils/queryKeys';

export const useBook = (isbn: string) => {
  return useQuery({
    queryKey: [queryKeys.NAVER_BOOK, isbn],
    queryFn: () => getNBook(isbn as string),
    enabled: !!isbn,
  });
};
