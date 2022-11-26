import * as React from 'react';
import styled from 'styled-components';
import Spinner from './Spinner';

const Container = styled.div`
  width: fit-content;
  margin: auto;
`;

export default function Loading() {
  return (
    <Container>
      <Spinner />
    </Container>
  );
}
