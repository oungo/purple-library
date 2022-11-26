import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { MouseEvent } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import Label from '../common/Label';
import { FormItem } from './styled';
import { AuthFormValue } from './types';

interface SignUpFormProps {
  onError: (errorMessage: string) => void;
}

export default function SignUpForm({ onError }: SignUpFormProps) {
  const supabase = useSupabaseClient();

  const handleSubmit = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formValue = Object.fromEntries(formData) as AuthFormValue;

    const { error } = await supabase.auth.signUp(formValue);
    if (error) {
      onError(error.message);
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

      <Button fullWidth buttonType="primary" type="submit">
        회원 가입
      </Button>
    </form>
  );
}
