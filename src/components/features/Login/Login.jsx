// import { useEffect } from 'react';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { REGEXFOREMAIL as regexEmail } from '../../../config/config.jsx';
import useInput from '../../../hooks/useInput.jsx';
import { useAuthContext } from '../../../stores/AuthContext.jsx';
// eslint-disable-next-line no-unused-vars
import AsideMenu from '../../Layout/AsideMenu//AsideMenu.jsx';
// import TopBar from '../../Layout/Topbar/TopBar.jsx';

// Import styles:
import './Login.scss';
// import LoginForm from './LoginForm.jsx';

// Helpers:
const isEmail = (email) => regexEmail.test(email);
const isPassword = (password) =>
  password.trim() !== '' && password.length >= 6 && password.length <= 20;

const Login = () => {
  const { user, login } = useAuthContext();
  // eslint-disable-next-line no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    handleInputChange: handleEmailInputChange,
    handleInputBlur: handleEmailInputBlur,
    reset: resetEmailInput,
  } = useInput(isEmail);

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    handleInputChange: handlePasswordInputChange,
    handleInputBlur: handlePasswordInputBlur,
    reset: resetPasswordInput,
  } = useInput(isPassword);

  let formIsValid = false;

  // Check for submit button:
  if (enteredEmailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  // Check and set classes:
  const emailInputClasses = emailInputHasError
    ? 'login__form-control invalid'
    : 'login__form-control';

  const passwordInputClasses = passwordInputHasError
    ? 'login__form-control invalid'
    : 'login__form-control';

  // Handle Submit:

  const handleLoginSubbmission = async (e) => {
    await login(e, enteredEmail, enteredPassword, resetEmailInput, resetPasswordInput);
  };

  console.log(user);

  // const handleLoginSubbmission = async (e) => {
  //   e.preventDefault();

  //   const user = { enteredEmail, enteredPassword };

  //   try {
  //     const response = await axios.post(API_ENDPOINT, {
  //       user,
  //     });

  //     const loginData = await response.data;
  //     console.log(loginData, '🚀🤘');
  //     setUser(loginData);
  //     localStorage.setItem('user', loginData);
  //   } catch (err) {
  //     console.error(`${err.message}, 💥🤯`);
  //     // n
  //   } finally {
  //     resetEmailInput();
  //     resetPasswordInput();
  //   }
  // };

  // Check if user log in:
  // useEffect(() => {
  //   const loggedInUser = localStorage.getItem('user');
  //   if (loggedInUser) {
  //     const foundUser = loggedInUser;
  //     console.log(foundUser);
  //     console.log(user);
  //     // setUser(foundUser);
  //   }
  // }, [user]);

  // console.log(user);
  // if (user) {
  //   // return <MyProfile />
  //   return <p>User is loggged in</p>;
  // }

  // if (isLoggedIn) {
  //   // return <MyProfile />
  //   return <p>User is loggged in</p>;
  // }

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = loggedInUser;
      console.log(foundUser);
      setIsLoggedIn(true);
    }
  }, []);

  // if (isLoggedIn) {
  //   return <AsideMenu />;
  // }

  return (
    <section className="login">
      <div className="login__content">
        <h2 className="login__title">uTeam - Login</h2>

        {/* <LoginForm
          props={
            (handleLoginSubbmission,
            emailInputClasses,
            handleEmailInputChange,
            handleEmailInputBlur,
            enteredEmail,
            emailInputHasError,
            passwordInputClasses,
            handlePasswordInputChange,
            handlePasswordInputBlur,
            passwordInputHasError,
            formIsValid)
          }
        /> */}
        <form onSubmit={(target) => handleLoginSubbmission(target)}>
          <div className="login__inputs-box">
            <div className={emailInputClasses}>
              <label className="login__input-label" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="login__input"
                onChange={(target) => handleEmailInputChange(target)}
                onBlur={handleEmailInputBlur}
                value={enteredEmail}
              />
              {emailInputHasError && <p className="login__error-text">Email is not a valid</p>}
            </div>
            <div className={passwordInputClasses}>
              <label className="login__input-label" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="login__input"
                onChange={(target) => handlePasswordInputChange(target)}
                onBlur={handlePasswordInputBlur}
                placeholder="length 6-20"
              />
              {passwordInputHasError && (
                <p className="login__error-text">Password is not a valid</p>
              )}
            </div>
          </div>
          <div className="login__btn-box">
            <Link to="/register">
              <p className="login__paragraph">Don’t have an account?</p>
            </Link>
            <button disabled={!formIsValid} className="login__btn">
              Login
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
