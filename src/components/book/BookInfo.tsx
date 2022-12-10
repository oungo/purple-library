import { BookData, NBook } from '@/types/book';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import Button from '../common/Button';
import * as queryKeys from '@/utils/queryKeys';
import StockBookCount from './StockBookCount';
import ToPurchaseBookCount from './ToPurchaseBookCount';
import { addBook } from 'api/books';
import { colors } from '@/styles/color';
import { useUser } from '@/hooks/use-user';
import { useSupabaseClient } from '@/hooks/use-supabase-client';
import { PostgrestResponse } from '@supabase/supabase-js';

const Article = styled.article`
  display: flex;
  gap: 3rem;
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
const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  dt {
    color: ${colors.third};
  }
`;
const BuyLink = styled.a`
  color: ${colors.second};
`;
export interface BookInfoProps {
  book: NBook;
}

export default function BookInfo({ book }: BookInfoProps) {
  const queryClient = useQueryClient();
  const supabaseClient = useSupabaseClient();
  const { data: user } = useUser();

  const { mutate, isLoading } = useMutation<PostgrestResponse<undefined>, unknown, BookData>({
    mutationFn: (value) => addBook(supabaseClient, value),
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.STOCK_BOOK_COUNT]);
      queryClient.invalidateQueries([queryKeys.TO_PURCHASE_BOOK_COUNT]);
    },
  });

  const handleAddBook = (inStock: boolean) => {
    const { title, author, publisher, isbn, image, discount } = book;
    const bookData: BookData = {
      title,
      author,
      publisher,
      isbn,
      image,
      discount,
      inStock,
      buyer: user?.data?.email || '',
    };

    mutate(bookData);
  };

  return (
    <Article>
      <section>
        <CoverImage src={book.image} alt="책 이미지" />
      </section>
      <InfoSection>
        <InfoWrapper>
          <Title>{book.title}</Title>
          {book.author && (
            <Wrapper>
              <dt>작가</dt>
              <dd>{book.author}</dd>
            </Wrapper>
          )}
          {book.publisher && (
            <Wrapper>
              <dt>출판사</dt>
              <dd>{book.publisher}</dd>
            </Wrapper>
          )}
          {book.link && (
            <dd>
              <BuyLink href={book.link} target="_blank" rel="noreferrer noopener">
                구매 링크
              </BuyLink>
            </dd>
          )}
        </InfoWrapper>

        <ButtonWrapper>
          <Button buttonType="primary" loading={isLoading} onClick={() => handleAddBook(false)}>
            구매 예정 도서 추가
          </Button>
          <Button loading={isLoading} onClick={() => handleAddBook(true)}>
            사내 도서 추가
          </Button>
        </ButtonWrapper>

        <StockBookCount isbn={book.isbn} />
        <ToPurchaseBookCount isbn={book.isbn} />
      </InfoSection>
    </Article>
  );
}
