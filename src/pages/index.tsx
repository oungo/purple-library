import { IBook } from '../types/book';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Index() {
  const [books, setBooks] = useState<IBook[]>([]);

  useEffect(() => {
    try {
      axios('http://localhost:8010/books').then((res) => {
        setBooks(res.data.items);
      });
    } catch (error) {
      console.log('error', error);
    }
  }, []);

  return (
    <div className="1231312">
      {books.map((book) => {
        return (
          <>
            <p>{book.author}</p>
            <p>{book.description}</p>
            <p>{book.discount}</p>
            <p>{book.isbn}</p>
            <p>{book.image}</p>
            <p>{book.pubdate}</p>
            <p>{book.publisher}</p>
            <p>{book.title}</p>
          </>
        );
      })}
    </div>
  );
}
export default Index;
