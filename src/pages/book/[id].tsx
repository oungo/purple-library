import axios from 'axios';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { IBook } from '../../types/book';

export default function BookInfo() {
  const router = useRouter();

  const { data: book } = useQuery<IBook[]>(['book', router.query.id], () =>
    axios.get(`http://localhost:8010/book/${router.query.id}`).then((res) => res.data.items)
  );

  if (!book) return null;

  return <div>{book.map((info) => info.title)}</div>;
}
