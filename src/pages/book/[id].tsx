import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getBook } from '../../controller/book';
import { IBook } from '../../types/book';
import { axiosInstance } from '../../utils/common';

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

interface IBookInfoProps {
  book: IBook[];
}

export default function BookInfo({ book: initialData }: IBookInfoProps) {
  const router = useRouter();
  const { id } = router.query;

  const { data: book } = useQuery<IBook[]>(
    ['book', id],
    () => axiosInstance.get(`/book/${id}`).then((res) => res.data.items),
    {
      enabled: !!id,
      initialData,
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
              {info.author && <dd>작가 {info.author}</dd>}
              {info.publisher && <dd>출판사 {info.publisher}</dd>}
              {info.link && (
                <dd>
                  <a href={info.link} target="_blank" rel="noreferrer noopener">
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  return { props: { book: await getBook(context.query.id) } };
};
