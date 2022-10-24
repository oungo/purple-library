import { useModalStore } from '@/store/useModalStore';
import styled from 'styled-components';
import React from 'react';
import { useBookIdStore } from '@/store/useBookIdStore';
import BookModalContent from './BookModalContent';

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
  background-color: white;
  top: 25%;
  width: 50%;
  margin: auto;
  padding: 1rem;
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
  const { id } = useBookIdStore();
  const { isOpen, close } = useModalStore();

  if (!isOpen || !id) return null;

  return (
    <Container>
      <Content>
        <HeadSection>
          <Title>도서 수정</Title>
          <CloseButton onClick={close}>닫기</CloseButton>
        </HeadSection>

        <BodySection>
          <BookModalContent />
        </BodySection>
      </Content>
    </Container>
  );
}
