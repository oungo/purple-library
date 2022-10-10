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
        <li>전체</li>
        <li>내 책</li>
      </NavList>
    </nav>
  );
}
