import Link from 'next/link';
import styled from 'styled-components';
import { useDebounce } from '@/hooks/use-debounce';
import { useSearchResult } from '@/hooks/queries/useSearchResult';
import { useBoundStore } from '@/store/useBoundStore';
import { colors } from '@/styles/color';
import { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ErrorComponent from '../common/ErrorComponent';
import Loading from '../common/Loading';
import ErrorBoundary from '../ErrorBoundary';

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
  padding: 10px;
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
    background-color: ${colors.lightGray};
  }
`;

export default function SearchResult() {
  return (
    <ErrorBoundary
      renderFallback={({ error }) => (
        <Container>
          <ErrorComponent error={error} />
        </Container>
      )}
    >
      <Suspense
        fallback={
          <Container>
            <Loading />
          </Container>
        }
      >
        <BookTitleList />
      </Suspense>
    </ErrorBoundary>
  );
}

function BookTitleList() {
  const router = useRouter();
  const keyword = useBoundStore((state) => state.keyword);
  const newKeyword = useDebounce(keyword, 200);

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

  if (!books || books.length < 1 || !isShowList) return null;

  return (
    <Container>
      {books?.map((book) => {
        return (
          <BookTitle key={book.isbn}>
            <Link href={{ pathname: `/book/[isbn]`, query: { isbn: book.isbn } }}>
              {book.title}
            </Link>
          </BookTitle>
        );
      })}
    </Container>
  );
}
