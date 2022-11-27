import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { MouseEvent, useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import Label from '../common/Label';
import { FormItem } from './styled';
import { AuthFormValue } from './types';

interface LoginFormProps {
  onError: (errorMessage: string) => void;
}

export default function LoginForm({ onError }: LoginFormProps) {
  const supabase = useSupabaseClient();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: MouseEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formValue = Object.fromEntries(formData) as AuthFormValue;

    const { error } = await supabase.auth.signInWithPassword(formValue);
    if (error) {
      onError(error.message);
      setLoading(false);
    }
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
        로그인
      </Button>
    </form>
  );
}
