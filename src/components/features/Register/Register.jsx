import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import { API_ENDPOINT } from '../../../config/config.js';

import './Register.scss';

const Registration = () => {
  const [userData, setUserData] = useState({
    identifier: '',
    password: '',
    file: [],
  });

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    // eslint-disable-next-line no-unused-vars
    reset,
    trigger,
  } = useForm();

  const handleSubmitRegistration = (data) => {
    setUserData(data);

    const handleRegistration = async () => {
      try {
        console.log(data, 'async');
        const response = await axios.post(`${API_ENDPOINT}register`, data);
        localStorage.setItem('userJwt', response.data.jwt);
        navigate('/my-profile');
      } catch (err) {
        console.log(err.message);
      } finally {
        //reset();
      }
    };

    handleRegistration();
  };

  console.log(userData);

  return (
    <div className="register">
      <div className="register__content">
        <h2 className="register__title">uTeam - Register</h2>

        <form onSubmit={handleSubmit((data) => handleSubmitRegistration(data))}>
          <div className="register__field">
            <label className="register__label" htmlFor="name">
              Name:
            </label>
            <input
              type="text"
              id="name"
              className={`register__input ${errors.name && 'invalid'}`}
              placeholder="Name"
              {...register('name', { required: 'Name is required' })}
              onKeyUp={() => {
                trigger('name');
              }}
            />
          </div>
          {errors.name && <p className="register__error-message">{errors.name.message}</p>}

          <div className="register__field">
            <label className="register__label" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className={`register__input ${errors.email && 'invalid'}`}
              placeholder="Email"
              {...register('email', {
                required: 'Email is Required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              onKeyUp={() => {
                trigger('email');
              }}
            />
          </div>
          {errors.email && <p className="register__error-message">{errors.email.message}</p>}

          <div className="register__field">
            <label className="register__label" htmlFor="password">
              Password:
            </label>
            <input
              className={`register__input ${errors.password && 'invalid'}`}
              type="password"
              id="password"
              placeholder="Password"
              {...register('password', {
                required: 'Paswword is required',
                minLength: {
                  value: 6,
                  message: 'Your password must be at least 6 characters long',
                },
                maxLength: {
                  value: 15,
                  message: 'Your password must not be longer than 15 characters',
                },
              })}
              onKeyUp={() => {
                trigger('password');
              }}
            />
          </div>
          {errors.password && <p className="register__error-message">{errors.password.message}</p>}

          <div className="register__field">
            <label className="register__label" htmlFor="upload_file">
              Profile Photo
            </label>
            <input
              type="file"
              id="upload_file"
              accept=".png, .jpg, .jpeg"
              placeholder="Upload File"
              {...register('file')}
            />
          </div>

          <div className="register__btn-conteiner">
            <Link to="/login">
              <span className="register__paragraph"> Already have an account? </span>
            </Link>
            <input type="submit" value="submit" className="register__btn" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
