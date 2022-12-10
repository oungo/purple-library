import { useSupabaseClient } from '@/hooks/use-supabase-client';
import { MouseEvent, useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import Label from '../common/Label';
import { FormItem } from './styled';
import { AuthFormValue } from './types';

interface ResetPasswordFormProps {
  onError: (errorMessage: string) => void;
}

export default function ResetPasswordForm({ onError }: ResetPasswordFormProps) {
  const [successSendMail, setSuccessSendEmail] = useState(false);
  const [loading, setLoading] = useState(false);

  const supabase = useSupabaseClient();

  const handleSubmit = async (e: MouseEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formValue = Object.fromEntries(formData) as AuthFormValue;

    const { data, error } = await supabase.auth.resetPasswordForEmail(formValue.email);
    if (data) {
      setSuccessSendEmail(true);
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
        <Input type="email" pattern=".+@purple.io" name="email" id="email" fullWidth />
      </FormItem>

      <Button buttonType="primary" type="submit" loading={loading} fullWidth>
        이메일로 비밀번호 재설정 안내
      </Button>

      {successSendMail && <p>비밀번호 재설정 안내 메일을 발송했습니다. 메일을 확인해주세요.</p>}
    </form>
  );
}
