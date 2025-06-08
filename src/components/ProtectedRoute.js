import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../api/authService';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuth = isAuthenticated();

  if (!isAuth) {
    // Redirect to login page, but save the current location they were trying to go to
    return <Navigate to={`/login?next=${encodeURIComponent(location.pathname)}`} replace />;
  }

  return children;
};

export default ProtectedRoute;
