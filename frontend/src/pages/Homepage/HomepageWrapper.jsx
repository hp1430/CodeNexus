import { useState } from 'react';
import HomePage from './Homepage';

export const HomepageWrapper = () => {
  const [isLoginDialogOpen, setLoginDialogOpen] = useState(false);
  const [isSignupDialogOpen, setSignupDialogOpen] = useState(false);
  const [isOtpDialogOpen, setOtpDialogOpen] = useState(false);

  function handleLoginClick() {
    setLoginDialogOpen(true);
    setTimeout(() => {
      setSignupDialogOpen(false);
    }, 300);
  }

  function handleSignupClick() {
    setSignupDialogOpen(true);
    setTimeout(() => {
      setLoginDialogOpen(false);
    }, 300);
  }

  function openOtpDialog() {
    console.log('Opening OTP Dialog function is called');
    setOtpDialogOpen(true);
    setTimeout(() => {
      setSignupDialogOpen(false);
    }, 300);
  }

  function handleOtpDialogOpenChange(value) {
    setOtpDialogOpen(value);
  }

  return (
    <HomePage
      isLoginDialogOpen={isLoginDialogOpen}
      isSignupDialogOpen={isSignupDialogOpen}
      onLoginClick={handleLoginClick}
      onSignupClick={handleSignupClick}
      onLoginDialogOpenChange={setLoginDialogOpen}
      onSignupDialogOpenChange={setSignupDialogOpen}
      isOtpDialogOpen={isOtpDialogOpen}
      onOtpDialogOpenChange={handleOtpDialogOpenChange}
      openOtpDialog={openOtpDialog}
    />
  );
};
