import { colors } from '@/styles/color';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { Appearance, I18nVariables } from '@supabase/auth-ui-react/dist/esm/src/types';
import styled from 'styled-components';

const Container = styled.div`
  width: 30%;
  margin: auto;
`;

const appearance: Appearance = {
  theme: ThemeSupa,
  variables: {
    default: {
      colors: {
        brand: colors.brand,
        brandAccent: colors.brandAccent,
      },
    },
  },
};

const localizationVariables: I18nVariables = {
  sign_in: {
    email_label: '이메일',
    password_label: '비밀번호',
    button_label: '로그인',
    link_text: '로그인',
  },
  forgotten_password: {
    email_label: '이메일',
    link_text: '비밀번호 찾기',
    button_label: '이메일로 비밀번호 재설정 안내',
  },
  sign_up: {
    email_label: '이메일',
    password_label: '비밀번호',
    button_label: '회원 가입',

    link_text: '회원 가입',
  },
};

export default function AuthGuard() {
  const supabase = useSupabaseClient();

  return (
    <Container>
      <Auth
        supabaseClient={supabase}
        appearance={appearance}
        localization={{ variables: localizationVariables }}
      />
    </Container>
  );
}
