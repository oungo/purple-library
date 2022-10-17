import { PAGE_SIZE } from '@/utils/common';
import { useRouter } from 'next/router';
import { MouseEvent } from 'react';

interface PaginationProps {
  total: number;
}

const getPageNumbers = (total: number) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(total / PAGE_SIZE); i++) {
    pageNumbers.push(i);
  }
  return pageNumbers;
};

export default function Pagination({ total }: PaginationProps) {
  const router = useRouter();

  const handleMovePage = (e: MouseEvent<HTMLDivElement>) => {
    router.replace({
      pathname: router.pathname,
      query: {
        page: (e.target as HTMLDivElement).textContent,
      },
    });
  };

  if (!total) null;

  return (
    <div onClick={handleMovePage}>
      {getPageNumbers(total).map((page) => (
        <a key={page}>{page}</a>
      ))}
    </div>
  );
}
