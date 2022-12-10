import { useQuery } from 'react-query';
import * as queryKeys from '@/utils/queryKeys';
import { getNBooks } from 'api/naverBook';

export const useSearchResult = (keyword: string) => {
  return useQuery({
    queryKey: [queryKeys.NAVER_BOOKS, keyword],
    queryFn: () => getNBooks(keyword),
    enabled: !!keyword,
  });
};
