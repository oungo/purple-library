import styled from 'styled-components';

const Container = styled.div`
  height: 30px;
`;
const Square = styled.div`
  display: inline-block;
  background-color: #8938f5;
  width: 150px;
  height: 100%;
`;
const I = styled.div`
  display: inline-block;
  background-color: #000000;
  width: 5px;
  height: 100%;
  margin: 0 15px;
`;
const O = styled.div`
  display: inline-block;
  border-radius: 50%;
  border: 5px solid black;
  width: 30px;
  height: 100%;
`;
export default function Logo() {
  return (
    <Container>
      <Square></Square>
      <I></I>
      <O></O>
    </Container>
  );
}
