import styled from 'styled-components';
import React from 'react';
import { colors } from '@/styles/color';
import { User } from '@/types/user';
import Input from '../common/Input';
import Label from '../common/Label';
import Button from '../common/Button';

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

interface UserModalProps {
  selectedUser?: User;
  closeModal: () => void;
}

export default function UserModal({ selectedUser, closeModal }: UserModalProps) {
  return (
    <Container>
      <Content>
        <HeadSection>
          <Title>사용자 정보</Title>
          <CloseButton onClick={closeModal}>닫기</CloseButton>
        </HeadSection>

        <BodySection>
          <form>
            <Label htmlFor="name">이름</Label>
            <Input name="name" id="name" placeholder="이름" />

            <Label>권한</Label>
            <select defaultValue={selectedUser?.role || ''}>
              <option value="admin">관리자</option>
              <option value="user">사용자</option>
            </select>

            <Button buttonType="primary">저장</Button>
          </form>
        </BodySection>
      </Content>
    </Container>
  );
}
