import Link from 'next/link';
import styled from 'styled-components';
import Nav from './Nav';

const Head = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 1rem 4rem;
`;

export default function Header() {
  return (
    <Head>
      <Link href="/">홈</Link>
      <Nav />
    </Head>
  );
}
