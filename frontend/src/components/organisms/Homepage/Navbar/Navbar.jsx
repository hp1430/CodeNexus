import Button from '@/components/atoms/Homepage/Button/Button';
import useUserStore from '@/hooks/store/useUserStore';
import logo from '@/assets/logo2.PNG';
import { useState } from 'react';

export default function Navbar({ onLoginClick, isLoggedIn }) {
  const [loading, setLoading] = useState(false);
  const { logout } = useUserStore();
  function handleLogoutClick() {
    setLoading(true);
    setTimeout(() => {
      logout();
      setLoading(false);
    }, 1500);
  }
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 px-6 py-4 sm:px-8 lg:px-10 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <img src={logo} className="h-16 w-auto" />
        <div className="flex items-center gap-3">
          {loading && (
            <Button variant="outline" className="cursor-not-allowed" disabled>
              Logging out...
            </Button>
          )}
          {isLoggedIn && !loading && (
            <Button
              onClick={handleLogoutClick}
              variant="outline"
              className="cursor-pointer"
            >
              Logout
            </Button>
          )}
          {!isLoggedIn && !loading && (
            <Button
              onClick={onLoginClick}
              variant="outline"
              className="cursor-pointer"
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
