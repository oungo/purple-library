import { useSupabaseClient } from '@/hooks/use-supabase-client';
import { getFormValue } from '@/utils/common';
import { SignUpWithPasswordCredentials } from '@supabase/supabase-js';
import { MouseEvent, useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import Label from '../common/Label';
import { FormItem } from './styled';

interface SignUpFormProps {
  onError: (errorMessage: string) => void;
}

export default function SignUpForm({ onError }: SignUpFormProps) {
  const [successSendAuthMail, setSuccessSendAuthMail] = useState(false);
  const [loading, setLoading] = useState(false);

  const supabase = useSupabaseClient();

  const handleSubmit = async (e: MouseEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp(
      getFormValue(e.target) as SignUpWithPasswordCredentials
    );

    if (data.user) {
      setSuccessSendAuthMail(true);
    }
    if (error) {
      onError(error.message);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormItem>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          pattern=".+@purple.io"
          name="email"
          id="email"
          placeholder="퍼플아이오 메일을 사용해주세요. ex) admin@purple.io"
          fullWidth
        />
      </FormItem>
      <FormItem>
        <Label htmlFor="password">Password</Label>
        <Input type="password" name="password" fullWidth />
      </FormItem>

      <Button buttonType="primary" type="submit" loading={loading} fullWidth>
        회원 가입
      </Button>

      {successSendAuthMail && <p>인증 메일을 발송했습니다. 메일을 확인해주세요.</p>}
    </form>
  );
}
