import { useQuery } from 'react-query';
import * as queryKeys from '@/utils/queryKeys';
import { getStockBookCount } from 'api/books';
import { useSupabaseClient } from '@/hooks/use-supabase-client';

export interface BookCountProps {
  isbn: string;
}

export default function StockBookCount({ isbn }: BookCountProps) {
  const supabaseClient = useSupabaseClient();
  const { data } = useQuery({
    queryKey: [queryKeys.STOCK_BOOK_COUNT, isbn],
    queryFn: () => getStockBookCount(supabaseClient, isbn),
  });

  if ((data?.count ?? 0) < 1) return null;

  return <p>{data?.count}권 보유 중</p>;
}
