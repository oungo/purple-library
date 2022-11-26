import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { MouseEvent, useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import Label from '../common/Label';
import { FormItem } from './styled';
import { AuthFormValue } from './types';

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
    const formData = new FormData(e.target as HTMLFormElement);
    const formValue = Object.fromEntries(formData) as AuthFormValue;

    const { data, error } = await supabase.auth.signUp(formValue);
    if (data) {
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
        <Input type="text" name="email" id="email" fullWidth />
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
