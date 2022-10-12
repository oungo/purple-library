import Link from 'next/link';
import styled from 'styled-components';
import { useKeywordStore } from '@/store/useKeywordStore';
import { useDebounce } from '@/hooks/use-debounce';
import { useSearchResult } from '@/hooks/queries/useSearchResult';

const BookContainer = styled.ul`
  width: 50%;
  margin: 1rem auto 0;
  list-style: none;
  border-radius: 0.5rem;
`;

const BookItem = styled.li`
  cursor: pointer;
  padding: 5px;
  border-radius: 0.5rem;
  a {
    display: block;
  }
  :hover {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    transition: box-shadow 0.2s;
  }
`;
const ErrorText = styled.p`
  color: red;
  text-align: center;
  margin-top: 1rem;
`;

export default function SearchResult() {
  const keyword = useKeywordStore((state) => state.keyword);
  const newKeyword = useDebounce(keyword, 700);

  const { data: books, error } = useSearchResult(newKeyword);

  if (error) return <ErrorText>데이터를 조회할 수 없습니다.</ErrorText>;
  if (!books) return null;

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
