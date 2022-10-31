import { colors } from '@/styles/color';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
      <Link href="/">홈</Link>

      <Search />

      <Nav />

      <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
    </Head>
  );
}
