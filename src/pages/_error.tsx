import { NextPage } from 'next';
import { useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const Container = styled.div`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

interface Props {
  statusCode?: number;
}

const Error: NextPage<Props> = ({ statusCode }) => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => router.push('/'), 3000);
  }, [router]);

  return (
    <Container>
      <p>
        {statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}
      </p>
      <p>3초 후 홈페이지로 이동합니다.</p>
    </Container>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
