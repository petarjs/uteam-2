import { Navigate } from 'react-router';

import { useAuthContext } from 'context/AuthContext.jsx';

const ProtectedRoute = ({ children }) => {
  const { isUserLoggedIn } = useAuthContext();

  return isUserLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
