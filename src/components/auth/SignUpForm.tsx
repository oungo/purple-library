import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { MouseEvent } from 'react';
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
      <label htmlFor="email">Email</label>
      <input type="text" name="email" id="email" />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" />

      <button type="submit">회원 가입</button>
    </form>
  );
}
