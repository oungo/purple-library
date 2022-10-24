import { NBook } from '@/types/book';
import { addBook } from '@/utils/book/addBook';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import Button from '../common/Button';
import * as queryKeys from '@/utils/queryKeys';
import StockBookCount from './StockBookCount';

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

export interface BookInfoProps {
  book: NBook;
}

export default function BookInfo({ book }: BookInfoProps) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(addBook, {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.STOCK_BOOK_COUNT]);
    },
  });

  const handleAddBook = async (inStock: boolean) => {
    mutate({ ...getBookData(book), inStock });
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

        <StockBookCount isbn={book.isbn} />

        <ButtonWrapper>
          <Button color="primary" onClick={() => handleAddBook(false)}>
            구매 예정 도서 추가
          </Button>
          <Button onClick={() => handleAddBook(true)}>사내 도서 추가</Button>
        </ButtonWrapper>
      </InfoSection>
    </Article>
  );
}

const unnecessaryKeys = ['description', 'link', 'discount', 'pubdate'];
function getBookData(book: NBook) {
  const bookData: { [key in keyof Partial<NBook>]: string } = {};

  for (const key in book) {
    if (unnecessaryKeys.includes(key)) continue;
    bookData[key as keyof NBook] = book[key as keyof NBook];
  }

  return bookData;
}
