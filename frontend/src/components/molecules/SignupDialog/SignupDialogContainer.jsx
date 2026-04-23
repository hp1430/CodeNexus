import { useEffect, useState } from 'react';
import { SignupDialog } from './SignupDialog';
import { useSignup } from '@/hooks/apis/auth/useSignup';

export const SignupDialogContainer = ({
  open,
  onOpenChange,
  onLoginClick,
  openOtpDialog,
}) => {
  const [signupForm, setSignupForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });

  const [validationError, setValidationError] = useState(null);

  const { isPending, error, isSuccess, signupMutation } = useSignup();

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem('signupEmail', signupForm.email);
      setTimeout(() => {
        openOtpDialog();
      }, 300);
    }
  }, [isSuccess, openOtpDialog, signupForm.email]);

  async function handleSignupFormSubmit(e) {
    e.preventDefault();

    if (
      !signupForm.email ||
      !signupForm.password ||
      !signupForm.confirmPassword ||
      !signupForm.name
    ) {
      console.log('All fields are required');
      setValidationError({ message: 'All fields are required' });
      return;
    }

    if (signupForm.password !== signupForm.confirmPassword) {
      console.log('Passwords do not match');
      setValidationError({ message: 'Passwords do not match' });
      return;
    }

    setValidationError(null);

    await signupMutation({
      email: signupForm.email,
      password: signupForm.password,
      name: signupForm.name,
    });
  }
  return (
    <SignupDialog
      open={open}
      onOpenChange={onOpenChange}
      onSubmit={handleSignupFormSubmit}
      onLoginClick={onLoginClick}
      signupForm={signupForm}
      validationError={validationError}
      error={error}
      setSignupForm={setSignupForm}
      isSuccess={isSuccess}
      isPending={isPending}
    />
  );
};
