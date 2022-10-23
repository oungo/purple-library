import { useModalStore } from '@/store/useModalStore';
import styled from 'styled-components';

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
  const { isOpen, close } = useModalStore();

  if (!isOpen) return null;

  return (
    <Container onClick={close}>
      <Content>
        <HeadSection>
          <Title>도서 수정</Title>
          <CloseButton onClick={close}>닫기</CloseButton>
        </HeadSection>

        <BodySection>
          <p>도서명</p>
          <p>저자</p>
          <p>출판사</p>
        </BodySection>
      </Content>
    </Container>
  );
}
