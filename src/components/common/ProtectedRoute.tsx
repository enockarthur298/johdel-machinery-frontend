import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../../api/authService';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

export const ProtectedRoute = ({ 
  children, 
  requireAdmin = false 
}: ProtectedRouteProps) => {
  const location = useLocation();
  const isAuth = isAuthenticated();

  if (!isAuth) {
    // Redirect to login page if not authenticated
    return <Navigate to={`/login?next=${encodeURIComponent(location.pathname)}`} replace />;
  }

  // TODO: Add admin check if requireAdmin is true
  // if (requireAdmin && !isAdmin) {
  //   return <Navigate to="/unauthorized" replace />;
  // }


  return <>{children}</>;
}
