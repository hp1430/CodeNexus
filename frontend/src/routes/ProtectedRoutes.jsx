import useUserStore from '@/hooks/store/useUserStore';
import { Navigate } from 'react-router-dom';

export const ProtectedRoutes = ({ children }) => {
  const token = useUserStore((state) => state.token);
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
};
