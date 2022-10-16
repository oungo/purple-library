import { useRouter } from 'next/router';
import * as React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import * as queryKeys from '@/utils/queryKeys';
import { getBook } from '@/controller/book';
import { supabase } from '@/utils/supabaseClient';
import { LibraryBook, NBook, NBookResponse } from '@/types/book';
import { Button, PrimaryButton } from './styled/Button';
import { Loading } from './Loading';

const Article = styled.article`
  display: flex;
  gap: 1rem;
  padding: 0 100px;
`;
const InfoSection = styled.section`
  width: 100%;
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
const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;
const CoverImage = styled.img`
  width: 400px;
  box-shadow: 1px 1px 5px;
`;

export interface BookProps {
  book: NBookResponse;
}

export default function Book({ book }: BookProps) {
  const router = useRouter();
  const { id } = router.query;

  const { data, error, isFetching } = useQuery([queryKeys.N_BOOK, id], () => getBook(id), {
    enabled: !!id,
    initialData: book,
  });

  if (isFetching) return <Loading />;
  if (!data || error) return null;

  return (
    <>
      {data.items.map((book) => {
        return <BookInfo key={book.isbn} book={book} />;
      })}
    </>
  );
}

function BookInfo({ book }: { book: NBook }) {
  const bookInfo = {
    title: book.title,
    author: book.author,
    publisher: book.publisher,
    isbn: book.isbn,
  };

  const handleAddBook = async (inStock: boolean) => {
    await supabase
      .from('book')
      .insert<LibraryBook>({ ...bookInfo, inStock })
      .throwOnError();
  };

  return (
    <Article>
      <section>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <CoverImage src={book.image} alt="책 이미지" />
      </section>
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
        <BookCount isbn={book.isbn} />

        <ButtonWrapper>
          <PrimaryButton flex onClick={() => handleAddBook(false)}>
            구매 예정 도서 추가
          </PrimaryButton>
          <Button flex onClick={() => handleAddBook(true)}>
            사내 도서 추가
          </Button>
        </ButtonWrapper>
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
