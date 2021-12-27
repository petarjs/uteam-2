import axios from 'axios';
import { createContext, useContext, useState } from 'react';

import { API_ENDPOINT } from '../config/config.jsx';

const AuthContext = createContext({
  users: { indetifier: '', password: '' },
  // isLoggedIn: false,
  login: () => {},
  handleLogout: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (e, indetifier, password, resetEmailInput, resetPasswordInput) => {
    e.preventDefault();

    const user = { indetifier, password };

    try {
      const response = await axios.post(API_ENDPOINT, {
        user,
      });

      const loginData = await response.data;
      console.log(loginData, '🚀🤘');
      setUser(loginData);
      localStorage.setItem('user', loginData);
    } catch (err) {
      console.error(`${err.message}, 💥🤯`);
      // n
    } finally {
      resetPasswordInput();
      resetEmailInput();
    }
  };

  const handleLogout = () => {
    setUser({});
    localStorage.clear();
  };

  // useEffect(() => {
  //   const loggedInUser = localStorage.getItem('user');
  //   if (loggedInUser) {
  //     const foundUser = loggedInUser;
  //     console.log(foundUser);
  //     setIsLoggedIn(true);
  //   }
  // }, []);

  const authContext = {
    user,
    // isLoggedIn,
    login,
    handleLogout,
  };

  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};

export default AuthContext;
