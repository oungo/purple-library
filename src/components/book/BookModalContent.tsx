import { useQuery } from 'react-query';
import BookForm from './BookForm';
import * as queryKeys from '@/utils/queryKeys';
import { useBoundStore } from '@/store/useBoundStore';
import Spinner from '../common/Spinner';
import { getBook } from 'api/books';
import styled from 'styled-components';
import { colors } from '@/styles/color';
import { getUser } from 'api/user';
import { useUser } from '@supabase/auth-helpers-react';

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

export default function BookModalContent() {
  const selectedBookId = useBoundStore((state) => state.selectedBookId);
  const authUser = useUser();

  const { data: user } = useQuery([queryKeys.USER], () => getUser(authUser?.id), {
    enabled: !!authUser?.id,
  });

  const { data: book, isLoading } = useQuery(
    [queryKeys.BOOK, selectedBookId],
    () => getBook(selectedBookId),
    {
      enabled: !!selectedBookId,
    }
  );

  if (isLoading) return <Spinner />;
  if (!book?.data) return <>조회불가</>;

  return (
    <Section>
      <ImageWrapper>
        <img src={book.data.image || ''} alt="도서 이미지" width={250} height={350} />
      </ImageWrapper>

      <div>
        <dl>
          <Title>{book.data.title}</Title>
          {book.data.author && (
            <Wrapper>
              <DT>작가</DT>
              <dd>{book.data.author}</dd>
            </Wrapper>
          )}
          {book.data.publisher && (
            <Wrapper>
              <DT>출판사</DT>
              <dd>{book.data.publisher}</dd>
            </Wrapper>
          )}
        </dl>

        {user?.data?.role === 'admin' && (
          <FormWrapper>
            <BookForm book={book.data} />
          </FormWrapper>
        )}
      </div>
    </Section>
  );
}
