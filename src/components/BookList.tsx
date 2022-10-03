import axios from 'axios';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { useDebounce } from '../hooks/use-debounce';
import { useKeywordStore } from '../store/useKeywordStore';
import { IBook } from '../types/book';

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

export default function BookList() {
  const keyword = useKeywordStore((state) => state.keyword);
  const newKeyword = useDebounce(keyword, 1000);

  const { data: books } = useQuery<IBook[]>(
    ['books', newKeyword],
    () =>
      axios
        .get('http://localhost:8010/books', {
          params: { query: newKeyword },
        })
        .then((res) => res.data.items),
    {
      enabled: !!newKeyword,
    }
  );

  if (!books) return null;

  return (
    <BookContainer>
      {books.map((book) => {
        return <BookItem key={book.isbn}>{book.title}</BookItem>;
      })}
    </BookContainer>
  );
}
