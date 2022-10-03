import axios from 'axios';
import { useQuery } from 'react-query';
import { useDebounce } from '../hooks/use-debounce';
import { useKeywordStore } from '../store/useKeywordStore';
import { IBook } from '../types/book';

export default function BookList() {
  const keyword = useKeywordStore((state) => state.keyword);
  const newKeyword = useDebounce(keyword, 1000);

  const { data } = useQuery<IBook[]>(
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

  return (
    <ul>
      {data?.map((book) => {
        return <li key={book.isbn}>{book.title}</li>;
      })}
    </ul>
  );
}
