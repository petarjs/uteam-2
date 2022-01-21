import { createContext, useCallback, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import { login, register } from 'services/auth';
import { getUserStats, getProfileImage } from 'services/getUser';

const AuthContext = createContext({
  currentUser: {},
  isUserLoggedIn: false,
  handleLogin: () => {},
  handleLogout: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);
  const navigate = useNavigate();

  const loginUser = useCallback(
    async (userData) => {
      localStorage.setItem('userJwt', userData.jwt);
      setUserLoggedIn(true);
      navigate('/pending-approval');
      const user = await getUserStats();
      const userImage = await getProfileImage(user.id);
      user['imagePathURL'] = userImage[0];
      user['imageName'] = userImage[1];
      setCurrentUser(user);
      console.log(
        'USE DATARRRR U LOGINUSER JE::: ',
        userData,
        userData.jwt,
        user,
        ' slika je: ?? ',
        userImage
      );
    },
    [navigate]
  );

  const handleRegister = async (data) => {
    const userData = await register(data);
    loginUser(userData);
    return userData;
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
      console.log('FOUND USER jwt!!!', { jwt: foundUser });
      //setUserLoggedIn(true);
      loginUser({ jwt: foundUser });
    }
  }, [loginUser]);

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
