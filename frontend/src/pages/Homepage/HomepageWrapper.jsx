import { useState } from 'react';
import HomePage from './Homepage';

export const HomepageWrapper = () => {
  const [isLoginDialogOpen, setLoginDialogOpen] = useState(false);
  const [isSignupDialogOpen, setSignupDialogOpen] = useState(false);

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

  function handleLoginFormSubmit(e) {
    e.preventDefault();
    console.log('Login form submitted');
    setLoginDialogOpen(false);
  }

  return (
    <HomePage
      isLoginDialogOpen={isLoginDialogOpen}
      isSignupDialogOpen={isSignupDialogOpen}
      onLoginClick={handleLoginClick}
      onSignupClick={handleSignupClick}
      onLoginDialogOpenChange={setLoginDialogOpen}
      onSignupDialogOpenChange={setSignupDialogOpen}
      onLoginFormSubmit={handleLoginFormSubmit}
    />
  );
};
