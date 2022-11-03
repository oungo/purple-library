import { useQuery } from 'react-query';
import BookForm from './BookForm';
import * as queryKeys from '@/utils/queryKeys';
import { useBoundStore } from '@/store/useBoundStore';
import Loading from '../common/Loading';
import { getBook } from 'api/books';
import styled from 'styled-components';

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
const DescriptionList = styled.dl`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const FormWrapper = styled.div`
  margin-top: 1rem;
`;

export default function BookModalContent() {
  const selectedBookId = useBoundStore((state) => state.selectedBookId);

  const { data: book, isLoading } = useQuery(
    [queryKeys.BOOKS, selectedBookId],
    () => getBook(selectedBookId),
    {
      enabled: !!selectedBookId,
    }
  );

  if (isLoading) return <Loading />;
  if (!book?.data) return <>조회불가</>;

  return (
    <>
      <Section>
        <ImageWrapper>
          <img src={book.data.image || ''} alt="도서 이미지" width={250} height={350} />
        </ImageWrapper>

        <div>
          <DescriptionList>
            <dt>{book.data.title}</dt>
            {book.data.author && <dd>작가 {book.data.author}</dd>}
            {book.data.publisher && <dd>출판사 {book.data.publisher}</dd>}
          </DescriptionList>

          <FormWrapper>
            <BookForm book={book.data} />
          </FormWrapper>
        </div>
      </Section>
    </>
  );
}
