import { Link } from 'react-router-dom';

// Import styles:
import './LoginForm.scss';

const LoginForm = ({
  handleLoginSubbmission,
  emailInputClasses,
  handleEmailInputChange,
  handleEmailInputBlur,
  enteredEmail,
  emailInputHasError,
  passwordInputClasses,
  handlePasswordInputChange,
  handlePasswordInputBlur,
  passwordInputHasError,
  formIsValid,
}) => {
  return (
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
          {passwordInputHasError && <p className="login__error-text">Password is not a valid</p>}
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
  );
};

export default LoginForm;
