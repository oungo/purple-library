import { useRouter } from 'next/router';
import * as React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import * as queryKeys from '@/utils/queryKeys';
import { getBook } from '@/controller/book';
import { supabase } from '@/utils/supabaseClient';
import { BookDTO, IBook, IBookResponse } from '@/types/book';

const Article = styled.article`
  display: flex;
  justify-content: space-between;
`;
const CoverImageSection = styled.section`
  width: 50%;
  min-width: 30%;
`;
const InfoSection = styled.section`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex-shrink: 1;
`;
const Title = styled.dt`
  font-size: x-large;
  font-weight: 900;
`;
const InfoWrapper = styled.dl`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export interface IBookProps {
  book: IBookResponse;
}

export default function Book({ book }: IBookProps) {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useQuery([queryKeys.N_BOOK, id], () => getBook(id), {
    enabled: !!id,
    initialData: book,
  });

  if (!data || error) return null;

  return (
    <>
      {data.items.map((book) => {
        return <BookInfo key={book.isbn} book={book} />;
      })}
    </>
  );
}

function BookInfo({ book }: { book: IBook }) {
  const handleAddBook = async (book: IBook) => {
    const { title, author, publisher, isbn } = book;
    const bookDTO: BookDTO = {
      title,
      author,
      publisher,
      isbn,
    };
    await supabase.from('book').insert<BookDTO>(bookDTO).throwOnError();
  };

  return (
    <Article>
      <CoverImageSection>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={book.image} alt="책 이미지" />
      </CoverImageSection>
      <InfoSection>
        <InfoWrapper>
          <Title>{book.title}</Title>
          {book.author && <dd>작가 {book.author}</dd>}
          {book.publisher && <dd>출판사 {book.publisher}</dd>}
          {book.link && (
            <dd>
              <a href={book.link} target="_blank" rel="noreferrer noopener">
                구매 링크
              </a>
            </dd>
          )}
        </InfoWrapper>
        <div>
          <BookCount isbn={book.isbn} />
          <button>구매 예정 도서 추가</button>
          <button onClick={() => handleAddBook(book)}>사내 도서 추가</button>
        </div>
      </InfoSection>
    </Article>
  );
}

function BookCount({ isbn }: { isbn: string }) {
  const { data } = useQuery(
    ['bookByIsbn', isbn],
    async () => await supabase.from('book').select('id').eq('isbn', isbn)
  );

  if (!data || (data.data && data.data?.length < 1)) return null;

  return <p>{data.data?.length}권 보유 중</p>;
}
