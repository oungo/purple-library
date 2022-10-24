import { colors } from '@/styles/color';
import { getBooks } from '@/utils/book/getBooks';
import { PAGE_SIZE } from '@/utils/common';
import { useRouter } from 'next/router';
import * as queryKeys from '@/utils/queryKeys';
import { MouseEvent, useMemo } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { BookResponse } from '@/types/book';

const Container = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;
const PageNumbers = styled.div`
  display: flex;
  gap: 10px;
`;
const Arrow = styled.div`
  width: 30px;
  cursor: pointer;
  text-align: center;
`;

const PAGE_COUNT = 10;

interface PageNumberProps {
  active: boolean;
}
const PageNumber = styled.a<PageNumberProps>`
  background-color: ${(props) => (props.active ? `${colors.primary}` : 'white')};
  color: ${(props) => (props.active ? 'white' : 'black')};
  cursor: pointer;
  width: 30px;
  text-align: center;
  border-radius: 5px;
`;

interface PaginationProps {
  books: BookResponse;
}

export default function Pagination({ books }: PaginationProps) {
  const router = useRouter();
  const query = router.query;

  const { data } = useQuery([queryKeys.BOOKS, query], () => getBooks(query), {
    initialData: books,
  });

  const pageNumber = useMemo(() => Number(query.page || 1), [query.page]);

  const handleMovePage = (e: MouseEvent<HTMLAnchorElement>) => {
    router.replace({
      pathname: router.pathname,
      query: {
        ...query,
        page: (e.target as HTMLAnchorElement).textContent,
      },
    });
  };

  if (!data?.count || data?.data?.length < 1) return null;

  return (
    <Container>
      <PrevPageArrow pageNumber={pageNumber} />
      <PageNumbers>
        {getPageNumbers(data.count)
          .slice(getSliceStart(pageNumber), getSliceEnd(pageNumber))
          .map((page) => (
            <PageNumber key={page} active={pageNumber === page} onClick={handleMovePage}>
              {page}
            </PageNumber>
          ))}
      </PageNumbers>
      <NextPageArrow pageNumber={pageNumber} lastPage={getPageNumbers(data.count).length} />
    </Container>
  );
}

function getPageNumbers(total: number) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(total / PAGE_SIZE); i++) {
    pageNumbers.push(i);
  }
  return pageNumbers;
}

interface ArrowProps {
  pageNumber: number;
}
export function PrevPageArrow({ pageNumber }: ArrowProps) {
  const router = useRouter();

  const handleMovePrev = () => {
    if (pageNumber > 1) {
      router.replace({
        pathname: router.pathname,
        query: {
          ...router.query,
          page: pageNumber - 1,
        },
      });
    }
  };
  return <Arrow onClick={handleMovePrev}>&lt;</Arrow>;
}

interface NextArrowProps extends ArrowProps {
  lastPage: number;
}
export function NextPageArrow({ pageNumber, lastPage }: NextArrowProps) {
  const router = useRouter();

  const handleMoveNext = () => {
    if (pageNumber < lastPage) {
      router.replace({
        pathname: router.pathname,
        query: {
          ...router.query,
          page: pageNumber + 1,
        },
      });
    }
  };
  return <Arrow onClick={handleMoveNext}> &#62;</Arrow>;
}

function getSliceStart(pageNumber = 0) {
  return Math.floor((pageNumber - 1) / PAGE_COUNT) * PAGE_COUNT;
}
function getSliceEnd(pageNumber: number) {
  return getSliceStart(pageNumber) + PAGE_COUNT;
}
