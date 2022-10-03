import styled from 'styled-components';
import Header from './Header';

const Main = styled.main`
  padding: 4rem;
`;

export interface ILayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayoutProps) {
  return (
    <>
      <Header />
      <Main>{children}</Main>
    </>
  );
}
