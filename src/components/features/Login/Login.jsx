/* eslint-disable no-unused-vars */
import clsx from 'clsx';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import AsideMenu from 'components/Layout/AsideMenu/AsideMenu';
import { useAuthContext } from 'context/AuthContext.jsx';
import useInput from 'hooks/useInput.jsx';
import { isEmail, isPassword } from 'utils/validation';

// Import styles:
import './Login.scss';

const Login = () => {
  const { currentUser, isUserLoggedIn, handleLogin } = useAuthContext();
  const [formIsValid, setFormIsValid] = useState(false);

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

  if (enteredEmailIsValid && enteredPasswordIsValid && !formIsValid) {
    setFormIsValid(true);
  } else if ((!enteredEmailIsValid || !enteredPasswordIsValid) && formIsValid) {
    setFormIsValid(false);
  }

  // Check and set classes:
  const emailInputClasses = clsx('login__form-control', emailInputHasError && 'invalid');
  const passwordInputClasses = clsx('login__form-control', passwordInputHasError && 'invalid');

  // Handle Submit:
  const handleLoginSubbmission = async (e) => {
    e.preventDefault();
    await handleLogin(enteredEmail, enteredPassword);
    resetEmailInput();
    resetPasswordInput();
  };

  if (isUserLoggedIn) {
    return <AsideMenu isLogged={isUserLoggedIn} />;
  }

  return (
    <section className="login">
      <div className="login__content">
        <h2 className="login__title">uTeam - Login</h2>
        <form onSubmit={handleLoginSubbmission}>
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
                value={enteredPassword}
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
