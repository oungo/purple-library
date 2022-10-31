import { ReactElement } from 'react';
import styled from 'styled-components';
import Header from './Header';

export interface LayoutProps {
  children: React.ReactNode;
}

const Main = styled.main`
  margin-top: 2rem;
`;

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <Main>{children}</Main>
    </>
  );
}

export function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
}
