import Link from 'next/link';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getBooks } from '../controller/book';
import { useDebounce } from '../hooks/use-debounce';
import { useKeywordStore } from '../store/useKeywordStore';

const BookContainer = styled.ul`
  width: 50%;
  margin: auto;
  list-style: none;
  border: 1px solid black;
  border-top: 0;
`;

const BookItem = styled.li`
  padding: 5px;
  cursor: pointer;
  :hover {
    background-color: red;
  }
`;

export default function SearchResult() {
  const keyword = useKeywordStore((state) => state.keyword);
  const newKeyword = useDebounce(keyword, 1000);

  const { data: books, error } = useQuery(['books', newKeyword], () => getBooks(newKeyword), {
    enabled: !!newKeyword,
  });

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
