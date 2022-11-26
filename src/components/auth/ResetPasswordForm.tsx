import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { MouseEvent } from 'react';
import { AuthFormValue } from './types';

interface ResetPasswordFormProps {
  onError: (errorMessage: string) => void;
}

export default function ResetPasswordForm({ onError }: ResetPasswordFormProps) {
  const supabase = useSupabaseClient();

  const handleSubmit = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formValue = Object.fromEntries(formData) as AuthFormValue;

    const { error } = await supabase.auth.resetPasswordForEmail(formValue.email);
    if (error) {
      onError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input type="text" name="email" id="email" />

      <button type="submit">이메일로 비밀번호 재설정 안내</button>
    </form>
  );
}
