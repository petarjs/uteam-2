import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import { login, register } from 'services/auth';

const AuthContext = createContext({
  currentUser: { identifier: '', password: '' },
  isUserLoggedIn: false,
  handleLogin: () => {},
  handleLogout: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);
  const navigate = useNavigate();

  const loginUser = (userData) => {
    setCurrentUser(userData.user);
    localStorage.setItem('userJwt', userData.jwt);
    setUserLoggedIn(true);
    navigate('/pending-approval');
  };

  const handleRegister = async (data) => {
    const userData = await register(data);
    loginUser(userData);
  };

  const handleLogin = async (identifier, password) => {
    const userData = await login(identifier, password);
    loginUser(userData);
  };

  const handleLogout = () => {
    console.log('User LOGGED OUT!!');
    setCurrentUser(null);
    setUserLoggedIn(false);
    localStorage.clear();
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem('userJwt');
    if (loggedInUser) {
      const foundUser = loggedInUser;
      console.log('FOUND USER jwt!!!', foundUser);
      setUserLoggedIn(true);
    }
  }, []);

  const authContext = {
    currentUser,
    isUserLoggedIn,
    handleLogin,
    handleLogout,
    handleRegister,
  };

  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};

export default AuthContext;
