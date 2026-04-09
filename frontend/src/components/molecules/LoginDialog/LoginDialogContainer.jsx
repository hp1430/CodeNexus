import { useState } from 'react';
import { LoginDialog } from './LoginDialog';
import { useLogin } from '@/hooks/apis/auth/useLogin';

export const LoginDialogContainer = ({ open, onOpenChange, onSignupClick }) => {
  const [validationError, setValidationError] = useState(null);
  const { isPending, error, isSuccess, loginMutation } = useLogin();
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  async function handleLogin(e) {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) {
      console.log('All fields are required');
      setValidationError({ message: 'All fields are required' });
      return;
    }
    setValidationError(null);

    await loginMutation({
      email: loginForm.email,
      password: loginForm.password,
    });
  }
  return (
    <LoginDialog
      open={open}
      onSubmit={handleLogin}
      onOpenChange={onOpenChange}
      onSignupClick={onSignupClick}
      validationError={validationError}
      error={error}
      isSuccess={isSuccess}
      isPending={isPending}
      loginForm={loginForm}
      setLoginForm={setLoginForm}
    />
  );
};
