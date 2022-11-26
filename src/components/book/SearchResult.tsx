import Link from 'next/link';
import styled from 'styled-components';
import { useDebounce } from '@/hooks/use-debounce';
import { useSearchResult } from '@/hooks/queries/useSearchResult';
import { useBoundStore } from '@/store/useBoundStore';
import { colors } from '@/styles/color';
import { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ErrorBoundary from '../ErrorBoundary';
import Error from '../common/Error';
import Loading from '../common/Loading';

const Container = styled.ul`
  position: absolute;
  background-color: ${colors.white};
  width: 50%;
  margin: 3.5rem auto 0;
  list-style: none;
  border-radius: 0.5rem;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  z-index: 1;
`;
const BookTitle = styled.li`
  cursor: pointer;
  padding: 5px;
  border-radius: 0.5rem;
  text-align: left;
  a {
    display: block;
  }
  :hover {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    transition: box-shadow 0.2s;
    background-color: ${colors.gray};
  }
`;

export default function SearchResult() {
  return (
    <Container>
      <ErrorBoundary renderFallback={({ error }) => <Error error={error} />}>
        <Suspense fallback={<Loading />}>
          <BookTitleList />
        </Suspense>
      </ErrorBoundary>
    </Container>
  );
}

function BookTitleList() {
  const router = useRouter();
  const keyword = useBoundStore((state) => state.keyword);
  const newKeyword = useDebounce(keyword, 700);

  const [isShowList, setIsShowList] = useState(true);

  const { data: books } = useSearchResult(newKeyword);

  useEffect(() => {
    const handleChangeIsShowList = () => {
      setIsShowList(false);
    };

    router.events.on('routeChangeStart', handleChangeIsShowList);
    return () => {
      router.events.off('routeChangeStart', handleChangeIsShowList);
    };
  }, [router]);

  useEffect(() => {
    if (books) {
      setIsShowList(true);
    }
  }, [books]);

  if (!isShowList) return null;

  return (
    <>
      {books?.map((book) => {
        return (
          <BookTitle key={book.isbn}>
            <Link href={{ pathname: `/book/${book.isbn}` }}>{book.title}</Link>
          </BookTitle>
        );
      })}
    </>
  );
}
