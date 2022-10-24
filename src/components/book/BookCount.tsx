import { useQuery } from 'react-query';
import * as queryKeys from '@/utils/queryKeys';
import { getStockBookCount } from '@/utils/book/getStockBookCount';

export interface BookCountProps {
  isbn: string;
}

export default function BookCount({ isbn }: BookCountProps) {
  const { data } = useQuery([queryKeys.STOCK_BOOK_COUNT, isbn], () => getStockBookCount(isbn));

  if (!data || (data.data && data.data?.length < 1)) return null;

  return <p>{data.data?.length}권 보유 중</p>;
}
