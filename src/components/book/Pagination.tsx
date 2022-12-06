import { colors } from '@/styles/color';
import { PAGE_SIZE } from '@/utils/common';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Link from 'next/link';

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

interface PageNumberProps {
  active: boolean;
}
const PageNumber = styled.a<PageNumberProps>`
  background-color: ${(props) => (props.active ? colors.primary : colors.white)};
  color: ${(props) => (props.active ? colors.white : colors.black)};
  cursor: pointer;
  width: 30px;
  text-align: center;
  border-radius: 5px;
`;

interface PaginationProps {
  totalCount?: number;
}

const PAGE_COUNT = 10;

export default function Pagination({ totalCount }: PaginationProps) {
  const router = useRouter();
  const query = router.query;

  const pageNumber = Number(query.page || 1);

  if (!totalCount || totalCount < 1) return null;

  return (
    <Container>
      <PrevPageArrow pageNumber={pageNumber} />
      <PageNumbers>
        {getPageNumbers(totalCount)
          .slice(getSliceStart(pageNumber), getSliceEnd(pageNumber))
          .map((page) => (
            <Link key={page} href={{ pathname: router.pathname, query: { ...query, page } }}>
              <PageNumber active={pageNumber === page}>{page}</PageNumber>
            </Link>
          ))}
      </PageNumbers>
      <NextPageArrow pageNumber={pageNumber} lastPage={getPageNumbers(totalCount).length} />
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
