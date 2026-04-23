import Button from '@/components/atoms/Homepage/Button/Button';
import useUserStore from '@/hooks/store/useUserStore';
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
    <nav className="flex justify-between items-center px-8 py-4">
      <h1 className="text-2xl font-bold">CodeNexus</h1>
      <div className="flex gap-4">
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
    </nav>
  );
}
