import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';

/**
 * RoleBasedRoute component that renders children only if the user has the required role
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The child components to render if authorized
 * @param {string[]} props.allowedRoles - Array of role names that are allowed to access the route
 * @param {string} [props.redirectTo] - Path to redirect to if not authorized (default: '/login')
 * @returns {JSX.Element} The protected route component
 */
const RoleBasedRoute = ({ 
  children, 
  allowedRoles = [], 
  redirectTo = '/login' 
}) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Not logged in, redirect to login with return URL
    return <Navigate to={`${redirectTo}?next=${encodeURIComponent(location.pathname)}`} replace />;
  }

  // Check if user has any of the allowed roles
  const hasRequiredRole = user && user.roles && 
    user.roles.some(role => allowedRoles.includes(role));

  if (!hasRequiredRole) {
    // User is logged in but doesn't have required role
    return <Navigate to="/unauthorized" replace />;
  }

  // User is authenticated and has required role
  return <>{children}</>;
};

export default RoleBasedRoute;

// Example usage:
/*
<Routes>
  <Route 
    path="/admin" 
    element={
      <RoleBasedRoute allowedRoles={['admin']}>
        <AdminDashboard />
      </RoleBasedRoute>
    } 
  />
  <Route 
    path="/dashboard" 
    element={
      <RoleBasedRoute allowedRoles={['user', 'admin']}>
        <UserDashboard />
      </RoleBasedRoute>
    } 
  />
</Routes>
*/
