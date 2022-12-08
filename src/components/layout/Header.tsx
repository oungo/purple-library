import { colors } from '@/styles/color';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Search from '../book/Search';
import Loading from '../common/Loading';
import SSRSafeSuspence from '../SSRSafeSuspense';
import Logo from './Logo';
import Nav from './Nav';

const Head = styled.header`
  padding: 1rem 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${colors.lightGray};
`;
const LogoutButton = styled.button`
  margin-left: 1rem;
`;

export default function Header() {
  const supabase = useSupabaseClient();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <Head>
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>

      <Search />

      <SSRSafeSuspence fallback={<Loading />}>
        <Nav />
      </SSRSafeSuspence>

      <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
    </Head>
  );
}
