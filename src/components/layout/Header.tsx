import { useSupabaseClient } from '@/hooks/use-supabase-client';
import { colors } from '@/styles/color';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Search from '../book/Search';
import ErrorBoundary from '../ErrorBoundary';
import SSRSafeSuspence from '../SSRSafeSuspense';
import Logo from './Logo';
import Nav from './Nav';

const Head = styled.header`
  border-bottom: 1px solid ${colors.lightGray};
`;
const Wrapper = styled.div`
  padding: 1rem 4rem;
  max-width: 1920px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
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
      <Wrapper>
        <Link href="/">
          <a>
            <Logo />
          </a>
        </Link>

        <Search />

        <ErrorBoundary renderFallback={() => <></>}>
          <SSRSafeSuspence fallback={<></>}>
            <Nav />
          </SSRSafeSuspence>
        </ErrorBoundary>

        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
      </Wrapper>
    </Head>
  );
}
