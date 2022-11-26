import styled from 'styled-components';
import React, { Suspense } from 'react';
import BookModalContent from './BookModalContent';
import { useBoundStore } from '@/store/useBoundStore';
import { colors } from '@/styles/color';
import ErrorBoundary from '../ErrorBoundary';
import Error from '../common/Error';
import Loading from '../common/Loading';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.3);
`;
const Content = styled.div`
  border-radius: 10px;
  position: relative;
  background-color: ${colors.white};
  top: 25%;
  margin: auto;
  padding: 1rem;
  max-width: 700px;
  width: 100%;
`;
const HeadSection = styled.section`
  display: flex;
  justify-content: space-between;
`;
const Title = styled.h2`
  font-size: x-large;
  font-weight: bold;
`;
const CloseButton = styled.button``;
const BodySection = styled.div`
  margin-top: 2rem;
`;

export default function BookModal() {
  const selectedBookId = useBoundStore((state) => state.selectedBookId);
  const setSelectedBookId = useBoundStore((state) => state.setSelectedBookId);

  if (!selectedBookId) return null;

  return (
    <Container>
      <Content>
        <HeadSection>
          <Title>도서 정보</Title>
          <CloseButton onClick={() => setSelectedBookId(0)}>닫기</CloseButton>
        </HeadSection>

        <BodySection>
          <ErrorBoundary renderFallback={({ error }) => <Error error={error} />}>
            <Suspense fallback={<Loading />}>
              <BookModalContent />
            </Suspense>
          </ErrorBoundary>
        </BodySection>
      </Content>
    </Container>
  );
}
