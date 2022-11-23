import { useQuery } from 'react-query';
import * as queryKeys from '@/utils/queryKeys';
import { getNBooks } from 'api/naverBook';

export const useSearchResult = (keyword: string) => {
  return useQuery([queryKeys.NAVER_BOOKS, keyword], () => getNBooks(keyword), {
    enabled: !!keyword,
  });
};
