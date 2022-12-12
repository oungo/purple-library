import { NBook } from '@/types/book';
import styled from 'styled-components';
import Button from '../common/Button';
import StockBookCount from './StockBookCount';
import ToPurchaseBookCount from './ToPurchaseBookCount';
import { colors } from '@/styles/color';
import { useRouter } from 'next/router';
import { useBook } from './hooks/useBook';
import Modal from '../common/Modal';
import { useState } from 'react';
import AddBookForm from './AddBookForm';

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

export default function BookInfo() {
  const router = useRouter();

  const { data: book } = useBook(router.query.isbn as string);

  const [visibleBookModal, setVisibleBookModal] = useState(false);

  if (!book) return null;

  const handleOpenModal = () => {
    setVisibleBookModal(true);
  };

  const handleCloseModal = () => {
    setVisibleBookModal(false);
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
          <Button buttonType="primary" onClick={handleOpenModal}>
            구매 예정 도서 추가
          </Button>
        </ButtonWrapper>

        <Modal
          id="addBookModal"
          title="도서 추가"
          width="300px"
          visible={visibleBookModal}
          closeModal={handleCloseModal}
        >
          <AddBookForm closeModal={handleCloseModal} />
        </Modal>

        <StockBookCount isbn={book.isbn} />
        <ToPurchaseBookCount isbn={book.isbn} />
      </InfoSection>
    </Article>
  );
}
