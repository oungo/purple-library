import { colors } from '@/styles/color';
import { useState } from 'react';
import styled from 'styled-components';
import LoginForm from './auth/LoginForm';
import ResetPasswordForm from './auth/ResetPasswordForm';
import SignUpForm from './auth/SignUpForm';

const Container = styled.div`
  width: 500px;
  margin: auto;
  padding-top: 200px;
`;
const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`;
const ErrorText = styled.p`
  color: ${colors.red};
  text-align: center;
  margin-top: 1rem;
`;

type FormType = 'signUp' | 'login' | 'resetPassword';

export default function Auth() {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [formType, setFormType] = useState<FormType>('login');

  const onError = (errorMessage: string) => {
    setErrorMessage(errorMessage);
  };

  return (
    <Container>
      {formType === 'login' && <LoginForm onError={onError} />}
      {formType === 'resetPassword' && <ResetPasswordForm onError={onError} />}
      {formType === 'signUp' && <SignUpForm onError={onError} />}

      <ButtonGroup>
        {formType !== 'signUp' && <button onClick={() => setFormType('signUp')}>회원가입</button>}
        {formType !== 'login' && <button onClick={() => setFormType('login')}>로그인</button>}
        {formType !== 'resetPassword' && (
          <button onClick={() => setFormType('resetPassword')}>비밀번호 찾기</button>
        )}
      </ButtonGroup>

      <ErrorText>{errorMessage}</ErrorText>
    </Container>
  );
}
