import Link from 'next/link';
import styled from 'styled-components';

const NavList = styled.ul`
  display: flex;
  list-style: none;
  justify-content: space-between;
  gap: 2rem;
`;

export default function Nav() {
  return (
    <nav>
      <NavList>
        <li>
          <Link href="/books">전체</Link>
        </li>
        <li>내 책</li>
      </NavList>
    </nav>
  );
}
