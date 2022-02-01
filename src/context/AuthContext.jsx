import _ from 'lodash';
import { createContext, useCallback, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import { login, register } from 'services/auth';
import { changeUserStats, resetPassword } from 'services/changeUser';
import { createCompany } from 'services/company';
import { getUserStats, getProfileImage, getProfileId, getProfileImageId } from 'services/getUser';
import { createProfile, changeProfilePhoto } from 'services/profile';
import { uploadFile, deleteFile } from 'services/uploadFile';

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

  const loginUser = useCallback(async (userData) => {
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
  }, []);

  const handleRegister = async (data, uploadFileData) => {
    //const userData = await register(data);
    console.log('DATAAAAAAAA:??? ', data, uploadFileData);
    const [userData, companyResponse, uploadResponse] = await Promise.all([
      register(data.username, data.email, data.password),
      createCompany(data.username),
      uploadFile(uploadFileData),
    ]);
    console.log('REPOSNES DATAAAAAAAA:??? ', companyResponse.data.id, uploadResponse[0], userData);
    await createProfile(companyResponse.data.id, uploadResponse[0].id, userData.user.id);

    loginUser(userData);
  };

  const handleLogin = async (identifier, password) => {
    const loginResponse = await login(identifier, password);
    loginUser(loginResponse.data);
  };

  const handleLogout = () => {
    console.log('User LOGGED OUT!!');
    setCurrentUser(null);
    setUserLoggedIn(false);
    localStorage.clear();
  };

  const changeUsername = async (userId, newUsername) => {
    const newUserData = await changeUserStats(userId, newUsername);
    const user = _.cloneDeep(currentUser);
    user['username'] = newUserData['username'];
    setCurrentUser(user);
  };

  const changeUserPhoto = async (uploadFileData, userId) => {
    const [uploadResponse, profileId] = await Promise.all([
      uploadFile(uploadFileData),
      getProfileId(userId),
    ]);
    const oldProfilePhotoId = await getProfileImageId(userId);
    deleteFile(oldProfilePhotoId);

    await changeProfilePhoto(profileId, uploadResponse[0].id);
    const userImage = await getProfileImage(userId);
    const user = _.cloneDeep(currentUser);
    user['imagePathURL'] = userImage[0];
    user['imageName'] = userImage[1];
    setCurrentUser(user);
  };

  const changePassword = async (userId, userNewPassword) => {
    const resetPasswordResponse = await resetPassword(userId, userNewPassword);
    console.log('resetPasswordResponse', resetPasswordResponse, userNewPassword);
  };

  const isCurrentPasswordCorrect = async (userCurrentPassword, userEmail) => {
    const loginResponse = await login(userEmail, userCurrentPassword);
    if (loginResponse.status === 200) {
      return true;
    }
    return false;
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
    changeUsername,
    changeUserPhoto,
    changePassword,
    isCurrentPasswordCorrect,
  };

  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};

export default AuthContext;
