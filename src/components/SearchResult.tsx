import Link from 'next/link';
import styled from 'styled-components';
import { useKeywordStore } from '@/store/useKeywordStore';
import { useDebounce } from '@/hooks/use-debounce';
import { useSearchResult } from '@/hooks/queries/useSearchResult';

const BookContainer = styled.ul`
  width: 50%;
  margin: 1rem auto 0;
  list-style: none;
  border: 1px solid black;
  border-radius: 0.5rem;
`;

const BookItem = styled.li`
  padding: 5px;
  cursor: pointer;
  a {
    display: block;
  }
  :hover {
    font-size: 1.1rem;
  }
`;

export default function SearchResult() {
  const keyword = useKeywordStore((state) => state.keyword);
  const newKeyword = useDebounce(keyword, 1000);

  const { data: books, error } = useSearchResult(newKeyword);

  if (!books || error) return null;

  return (
    <BookContainer>
      {books.items.map((book) => {
        return (
          <BookItem key={book.isbn}>
            <Link href={{ pathname: `/book/${book.isbn}` }}>{book.title}</Link>
          </BookItem>
        );
      })}
    </BookContainer>
  );
}
