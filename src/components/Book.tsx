import { useRouter } from 'next/router';
import * as React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getBook } from '../controller/book';
import { IBookResponse } from '../types/book';

const Article = styled.article`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  width: 50%;
  margin: auto;
`;
const CoverImageSection = styled.section`
  width: 50%;
  min-width: 30%;
`;
const InfoSection = styled.dl`
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

export interface IBookProps {
  book: IBookResponse;
}

export default function Book({ book }: IBookProps) {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useQuery(['book', id], () => getBook(id), {
    enabled: !!id,
    initialData: book,
  });

  if (!data || error) return null;

  return (
    <>
      {data.items.map((book) => {
        return (
          <Article key={book.isbn}>
            <CoverImageSection>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={book.image} alt="책 이미지" />
            </CoverImageSection>
            <InfoSection>
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
            </InfoSection>
          </Article>
        );
      })}
    </>
  );
}
