import { useAuth } from '../store/useAuthStore';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { userInfo } = useAuth();

  return userInfo ? <Outlet /> : <Navigate to={'/'} />;
};
export default ProtectedRoute;
