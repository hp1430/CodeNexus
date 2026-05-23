import { useEffect, useState } from 'react';
import HomePage from './Homepage';
import { jwtDecode } from 'jwt-decode';
import useUserStore from '@/hooks/store/useUserStore';

export const HomepageWrapper = () => {
  const [isLoginDialogOpen, setLoginDialogOpen] = useState(false);
  const [isSignupDialogOpen, setSignupDialogOpen] = useState(false);
  const [isOtpDialogOpen, setOtpDialogOpen] = useState(false);
  const [isJoinRoomDialogOpen, setJoinRoomDialogOpen] = useState(false);

  const { user, token } = useUserStore();

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
    setOtpDialogOpen(true);
    setTimeout(() => {
      setSignupDialogOpen(false);
    }, 300);
  }

  function handleOtpDialogOpenChange(value) {
    setOtpDialogOpen(value);
  }

  function checkAuth() {
    const token = useUserStore.getState().token;

    if (!token) return;

    try {
      const decoded = jwtDecode(token);

      const isExpired = decoded.exp * 1000 < Date.now();

      if (isExpired) {
        useUserStore.getState().logout();
      }
    } catch {
      useUserStore.getState().logout();
    }
  }

  const isLoggedIn = !!user && !!token;

  useEffect(() => {
    checkAuth();
  }, []);

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
      isLoggedIn={isLoggedIn}
      isJoinRoomDialogOpen={isJoinRoomDialogOpen}
      setJoinRoomDialogOpen={setJoinRoomDialogOpen}
    />
  );
};
