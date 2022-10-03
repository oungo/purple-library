import Image from 'next/image';
import styled from 'styled-components';
import Nav from './Nav';

const Head = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 2rem 4rem;
`;

export default function Header() {
  return (
    <Head>
      <Image src="/images/book.png" alt="아이콘" width={50} height={50} />
      <Nav />
    </Head>
  );
}
