import { useState } from 'react';
import HomePage from './Homepage';

export const HomepageWrapper = () => {
  const [isLoginDialogOpen, setLoginDialogOpen] = useState(false);

  function handleLoginClick() {
    console.log('Login button clicked');
    setLoginDialogOpen(true);
  }

  function handleLoginFormSubmit(e) {
    e.preventDefault();
    console.log('Login form submitted');
    setLoginDialogOpen(false);
  }

  return (
    <HomePage
      isLoginDialogOpen={isLoginDialogOpen}
      onLoginClick={handleLoginClick}
      onLoginDialogOpenChange={setLoginDialogOpen}
      onLoginFormSubmit={handleLoginFormSubmit}
    />
  );
};
