import { colors } from '@/styles/color';
import { useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [formType, setFormType] = useState<FormType>('login');

  const onError = (errorMessage: string) => {
    setErrorMessage(errorMessage);
  };

  const handleChangeFormType = (value: FormType) => {
    setFormType(value);
    setErrorMessage('');
  };

  return (
    <Container>
      {formType === 'login' && <LoginForm onError={onError} />}
      {formType === 'resetPassword' && <ResetPasswordForm onError={onError} />}
      {formType === 'signUp' && <SignUpForm onError={onError} />}

      <ButtonGroup>
        {formType !== 'signUp' && (
          <button onClick={() => handleChangeFormType('signUp')}>회원가입</button>
        )}
        {formType !== 'login' && (
          <button onClick={() => handleChangeFormType('login')}>로그인</button>
        )}
        {formType !== 'resetPassword' && (
          <button onClick={() => handleChangeFormType('resetPassword')}>비밀번호 찾기</button>
        )}
      </ButtonGroup>

      <ErrorText>{errorMessage}</ErrorText>
    </Container>
  );
}
