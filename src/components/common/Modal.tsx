import { colors } from '@/styles/color';
import { ReactNode } from 'react';
import styled from 'styled-components';
import ModalPortal from './ModalPortal';

const Layer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.3);
`;
const Container = styled.section<{ width?: string }>`
  border-radius: 10px;
  position: relative;
  background-color: ${colors.white};
  top: 50%;
  transform: translateY(-50%);
  margin: auto;
  padding: 1rem;
  width: ${({ width }) => width || '1000px'};
`;
const Head = styled.div`
  display: flex;
  height: 40px;
`;
const Title = styled.h2`
  font-size: x-large;
  font-weight: bold;
`;
const Close = styled.button`
  margin-left: auto;
`;
const Content = styled.div`
  margin-top: 1rem;
`;
interface ModalProps {
  id: string;
  title?: string;
  visible: boolean;
  width?: string;
  closeModal: () => void;
  children: ReactNode;
}

export default function Modal({ id, title, visible, width, closeModal, children }: ModalProps) {
  return (
    <>
      <div id={id} />
      {visible && (
        <ModalPortal id={id}>
          <Layer>
            <Container width={width}>
              <Head>
                {title && <Title>{title}</Title>}
                <Close onClick={closeModal}>닫기</Close>
              </Head>
              <Content>{children}</Content>
            </Container>
          </Layer>
        </ModalPortal>
      )}
    </>
  );
}
