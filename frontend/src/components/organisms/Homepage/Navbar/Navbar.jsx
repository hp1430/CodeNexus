import Button from '@/components/atoms/Homepage/Button/Button';
import useUserStore from '@/hooks/store/useUserStore';

export default function Navbar({ onLoginClick, isLoggedIn }) {
  const { logout } = useUserStore();
  function handleLogoutClick() {
    logout();
  }
  return (
    <nav className="flex justify-between items-center px-8 py-4">
      <h1 className="text-2xl font-bold">CodeNexus</h1>
      <div className="flex gap-4">
        {isLoggedIn && (
          <Button
            onClick={handleLogoutClick}
            variant="outline"
            className="cursor-pointer"
          >
            Logout
          </Button>
        )}
        {!isLoggedIn && (
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
