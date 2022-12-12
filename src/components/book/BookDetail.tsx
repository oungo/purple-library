import BookForm from './BookForm';
import styled from 'styled-components';
import { colors } from '@/styles/color';
import { Book } from '@/types/book';
import { useUser } from '../../hooks/use-user';

const Section = styled.section`
  display: flex;
  gap: 1rem;
`;
const ImageWrapper = styled.div`
  width: 250px;
  height: 350px;
  min-width: 250px;
  min-height: 350px;
  box-shadow: 1px 1px 5px;
`;
const InfoWrapper = styled.div`
  width: 100%;
`;
const Title = styled.p`
  font-weight: bold;
  font-size: large;
  margin-bottom: 1rem;
`;
const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  dt {
    color: ${colors.third};
  }
`;

interface BookModalContentProps {
  selectedBook?: Book;
}

export default function BookDetail({ selectedBook }: BookModalContentProps) {
  const { data: user } = useUser();

  if (!selectedBook) return <p>조회불가</p>;

  return (
    <Section>
      <ImageWrapper>
        <img src={selectedBook.image || ''} alt="도서 이미지" width={250} height={350} />
      </ImageWrapper>

      <InfoWrapper>
        <dl>
          <Title>{selectedBook.title}</Title>
          {selectedBook.author && (
            <Wrapper>
              <dt>저자</dt>
              <dd>{selectedBook.author}</dd>
            </Wrapper>
          )}
          {selectedBook.publisher && (
            <Wrapper>
              <dt>출판사</dt>
              <dd>{selectedBook.publisher}</dd>
            </Wrapper>
          )}
          <Wrapper>
            <dt>상태</dt>
            <dd>{selectedBook.inStock ? '보유중' : '구매예정'}</dd>
          </Wrapper>
          <Wrapper>
            <dt>구매일자</dt>
            <dd>{selectedBook.buyDate}</dd>
          </Wrapper>
          <Wrapper>
            <dt>단가</dt>
            <dd>{selectedBook.discount}</dd>
          </Wrapper>
        </dl>

        {user?.data?.role === 'admin' && <BookForm book={selectedBook} />}
      </InfoWrapper>
    </Section>
  );
}
