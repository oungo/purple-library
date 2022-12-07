import BookForm from './BookForm';
import styled from 'styled-components';
import { colors } from '@/styles/color';
import { Book } from '@/types/book';
import { useCheckAdmin } from '@/hooks/use-check-admin';

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
const FormWrapper = styled.div`
  margin-top: 1rem;
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
`;
const DT = styled.dt`
  color: ${colors.fourth};
`;

interface BookModalContentProps {
  selectedBook?: Book;
}

export default function BookModalContent({ selectedBook }: BookModalContentProps) {
  const isAdmin = useCheckAdmin();

  if (!selectedBook) return <p>조회불가</p>;

  return (
    <Section>
      <ImageWrapper>
        <img src={selectedBook.image || ''} alt="도서 이미지" width={250} height={350} />
      </ImageWrapper>

      <div>
        <dl>
          <Title>{selectedBook.title}</Title>
          {selectedBook.author && (
            <Wrapper>
              <DT>작가</DT>
              <dd>{selectedBook.author}</dd>
            </Wrapper>
          )}
          {selectedBook.publisher && (
            <Wrapper>
              <DT>출판사</DT>
              <dd>{selectedBook.publisher}</dd>
            </Wrapper>
          )}
        </dl>

        {isAdmin && (
          <FormWrapper>
            <BookForm book={selectedBook} />
          </FormWrapper>
        )}
      </div>
    </Section>
  );
}
