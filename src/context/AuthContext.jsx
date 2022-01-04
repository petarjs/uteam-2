import axios from 'axios';
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import { API_ENDPOINT } from '../config/config.js';

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

  const handleLogin = async (identifier, password) => {
    const user = { identifier, password };

    try {
      const response = await axios.post(API_ENDPOINT, user);
      // console.log(response.data.user, '🚀🤘USER');
      // console.log('token', response.data.jwt);

      setCurrentUser(response.data.user);

      localStorage.setItem('userJwt', response.data.jwt);
      setUserLoggedIn(true);
      navigate('/my-profile');
    } catch (err) {
      console.error(`${err.message}, 💥🤯`);
    }
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
  };

  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};

export default AuthContext;
