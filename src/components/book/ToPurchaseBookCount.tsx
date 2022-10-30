import { useQuery } from 'react-query';
import * as queryKeys from '@/utils/queryKeys';
import { getToPurchaseBookCount } from 'api/books';

export interface BookCountProps {
  isbn: string;
}

export default function ToPurchaseBookCount({ isbn }: BookCountProps) {
  const { data } = useQuery([queryKeys.TO_PURCHASE_BOOK_COUNT, isbn], () =>
    getToPurchaseBookCount(isbn)
  );

  if (!data || (data.data && data.data?.length < 1)) return null;

  return <p>{data.data?.length}권 구매 예정</p>;
}
