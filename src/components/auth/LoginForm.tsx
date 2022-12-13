import { useSupabaseClient } from '@/hooks/use-supabase-client';
import { getFormValue } from '@/utils/common';
import { SignInWithPasswordCredentials } from '@supabase/supabase-js';
import { MouseEvent, useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import Label from '../common/Label';
import { FormItem } from './styled';

interface LoginFormProps {
  onError: (errorMessage: string) => void;
}

export default function LoginForm({ onError }: LoginFormProps) {
  const supabase = useSupabaseClient();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: MouseEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword(
      getFormValue(e.target) as SignInWithPasswordCredentials
    );
    if (error) {
      onError(error.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormItem>
        <Label htmlFor="email">Email</Label>
        <Input type="email" pattern=".+@purple.io" name="email" id="email" fullWidth />
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
