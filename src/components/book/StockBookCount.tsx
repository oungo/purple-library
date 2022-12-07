import { useQuery } from 'react-query';
import * as queryKeys from '@/utils/queryKeys';
import { getStockBookCount } from 'api/books';

export interface BookCountProps {
  isbn: string;
}

export default function StockBookCount({ isbn }: BookCountProps) {
  const { data } = useQuery([queryKeys.STOCK_BOOK_COUNT, isbn], () => getStockBookCount(isbn));

  if ((data?.count ?? 0) < 1) return null;

  return <p>{data?.count}권 보유 중</p>;
}
