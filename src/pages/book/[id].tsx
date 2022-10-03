import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { IBook } from '../../types/book';
import { axiosInstance } from '../../utils/common';

const Article = styled.article`
  display: flex;
  gap: 2rem;
`;
const CoverImageSection = styled.section`
  width: 30%;
`;
const InfoSection = styled.dl`
  width: 70%;
  flex-shrink: 1;
`;
const Title = styled.dt`
  font-size: x-large;
  font-weight: 900;
`;

export default function BookInfo() {
  const router = useRouter();
  const { id } = router.query;

  const { data: book } = useQuery<IBook[]>(
    ['book', id],
    () => axiosInstance.get(`/book/${id}`).then((res) => res.data.items),
    {
      enabled: !!id,
    }
  );

  if (!book) return null;

  return (
    <>
      {book.map((info) => {
        return (
          <Article key={info.isbn}>
            <CoverImageSection>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={info.image} alt="책 이미지" />
            </CoverImageSection>
            <InfoSection>
              <Title>{info.title}</Title>
              <dd>작가 {info.author}</dd>
              <dd>출판사 {info.publisher}</dd>
              <dd>{info.description}</dd>
              <dd>구매 링크 {info.link}</dd>
            </InfoSection>
          </Article>
        );
      })}
    </>
  );
}
