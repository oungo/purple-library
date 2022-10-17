import { PAGE_SIZE } from '@/utils/common';
import { useRouter } from 'next/router';
import { MouseEvent } from 'react';
import styled from 'styled-components';

const PageNumbers = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;
interface PageNumberProps {
  active: boolean;
}

const PageNumber = styled.a<PageNumberProps>`
  background-color: ${(props) => (props.active ? 'var(--primary-color)' : 'white')};
  color: ${(props) => (props.active ? 'white' : 'black')};
  cursor: pointer;
  width: 30px;
  text-align: center;
  border-radius: 5px;
  margin-top: 1rem;
`;

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
    if (e.target !== e.currentTarget) {
      router.replace({
        pathname: router.pathname,
        query: {
          page: (e.target as HTMLDivElement).textContent,
        },
      });
    }
  };

  if (!total) null;

  return (
    <PageNumbers onClick={handleMovePage}>
      {getPageNumbers(total).map((page) => (
        <PageNumber key={page} active={Number(router.query.page) === page}>
          {page}
        </PageNumber>
      ))}
    </PageNumbers>
  );
}
