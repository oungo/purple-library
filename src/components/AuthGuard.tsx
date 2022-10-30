import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import styled from 'styled-components';

const Container = styled.div`
  width: 30%;
  margin: auto;
`;

export default function AuthGuard() {
  const supabase = useSupabaseClient();

  return (
    <Container>
      <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
    </Container>
  );
}
