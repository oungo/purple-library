import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import Nav from './Nav';

const Head = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 2rem 4rem;
`;
const Anchor = styled.a`
  cursor: pointer;
`;

export default function Header() {
  return (
    <Head>
      <Link href="/">
        <Anchor>
          <Image src="/images/book.png" alt="아이콘" width={50} height={50} />
        </Anchor>
      </Link>
      <Nav />
    </Head>
  );
}
