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
  position: relative;
  width: 300px;
  height: 350px;
  box-shadow: 1px 1px 5px;
`;
const DescriptionList = styled.dl`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default function BookModalContent() {
  const id = useBoundStore((state) => state.id);

  const { data: book, isLoading } = useQuery([queryKeys.BOOKS, id], () => getBook(id), {
    enabled: !!id,
  });

  if (isLoading) return <Loading />;
  if (!book?.data) return <>조회불가</>;

  return (
    <>
      <Section>
        <ImageWrapper>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={book.data.image} alt="도서 이미지" width={300} height={350} />
        </ImageWrapper>

        <div>
          <DescriptionList>
            <dt>{book.data.title}</dt>
            {book.data.author && <dd>{book.data.author}</dd>}
            {book.data.publisher && <dd>{book.data.publisher}</dd>}
          </DescriptionList>

          <BookForm book={book.data} />
        </div>
      </Section>
    </>
  );
}
