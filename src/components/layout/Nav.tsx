import { useUser } from '@supabase/auth-helpers-react';
import styled from 'styled-components';
import { useCurrentUser } from '@/hooks/queries/useCurrentUser';
import Link from 'next/link';

const NavList = styled.ul`
  display: flex;
  list-style: none;
  justify-content: space-between;
  gap: 2rem;
`;

export default function Nav() {
  const authUser = useUser();

  const { data: user } = useCurrentUser(authUser?.id);

  return (
    <nav>
      <NavList>
        {user?.data?.role === 'admin' && (
          <li>
            <Link href="/user">사용자 목록</Link>
          </li>
        )}
      </NavList>
    </nav>
  );
}
