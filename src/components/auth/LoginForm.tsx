import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { MouseEvent } from 'react';
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

  const handleSubmit = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formValue = Object.fromEntries(formData) as AuthFormValue;

    const { error } = await supabase.auth.signInWithPassword(formValue);
    if (error) {
      onError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormItem>
        <Label htmlFor="email">Email</Label>
        <Input fullWidth type="text" name="email" id="email" />
      </FormItem>

      <FormItem>
        <Label htmlFor="password">Password</Label>
        <Input fullWidth type="password" name="password" />
      </FormItem>

      <Button fullWidth buttonType="primary" type="submit">
        로그인
      </Button>
    </form>
  );
}
