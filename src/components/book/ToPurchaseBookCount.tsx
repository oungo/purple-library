import { useQuery } from 'react-query';
import * as queryKeys from '@/utils/queryKeys';
import { getToPurchaseBookCount } from 'api/books';
import { useSupabaseClient } from '@/hooks/use-supabase-client';

export interface BookCountProps {
  isbn: string;
}

export default function ToPurchaseBookCount({ isbn }: BookCountProps) {
  const supabaseClient = useSupabaseClient();
  const { data } = useQuery({
    queryKey: [queryKeys.TO_PURCHASE_BOOK_COUNT, isbn],
    queryFn: () => getToPurchaseBookCount(supabaseClient, isbn),
  });

  if ((data?.count ?? 0) < 1) return null;

  return <p>{data?.count}권 구매 예정</p>;
}
