import { colors } from '@/styles/color';
import Link from 'next/link';
import styled from 'styled-components';
import Search from '../book/Search';
import Nav from './Nav';

const Head = styled.header`
  padding: 1rem 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${colors.gray};
`;

export default function Header() {
  return (
    <Head>
      <Link href="/">홈</Link>

      <Search />

      <Nav />
    </Head>
  );
}
