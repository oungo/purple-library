import Auth from '@/components/Auth';
import Logo from '@/components/layout/Logo';
import styled from 'styled-components';

const Container = styled.div`
  width: 500px;
  margin: auto;
  padding-top: 200px;
`;

export default function Login() {
  return (
    <Container>
      <Logo />
      <Auth />
    </Container>
  );
}
