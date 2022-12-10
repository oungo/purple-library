import { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';
import Header from './Header';

export interface LayoutProps {
  children: ReactNode;
}

const Main = styled.main`
  max-width: 1920px;
  margin: 2rem auto;
  padding: 0 4rem;
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
