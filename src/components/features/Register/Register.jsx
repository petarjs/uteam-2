// import axios from 'axios';
// import { useState } from 'react';
import { Avatar, Center } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { useAuthContext } from 'context/AuthContext.jsx';
import { getCompanies } from 'services/company';

import './Register.scss';

const Registration = () => {
  const { handleRegister, currentUser } = useAuthContext();
  const [profilePhoto, setProfilePhoto] = useState('https://bit.ly/dan-abramov');
  // eslint-disable-next-line no-unused-vars
  const [companies, setCompanies] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    // eslint-disable-next-line no-unused-vars
    reset,
    trigger,
    watch,
  } = useForm();

  const getAllCompanies = async () => {
    const companies = await getCompanies();
    setCompanies(companies.data);
  };

  useEffect(() => {
    getAllCompanies();
  }, []);

  const watchUsername = watch('username', '');
  const watchPassword = watch('password', '');

  const handleSubmitRegistration = async (data) => {
    const uploadFileData = new FormData();
    uploadFileData.append('files', data.image[0]);
    await handleRegister(data, uploadFileData);
  };

  const handleFileSelected = (e) => {
    const files = Array.from(e.target.files);
    if (files && files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        setProfilePhoto(e.target.result);
      };

      reader.readAsDataURL(files[0]);
    } else {
      setProfilePhoto('https://bit.ly/dan-abramov');
    }
  };

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
              {...register('username', { required: 'Name is required' })}
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
            <label className="register__label" htmlFor="confirmPassword">
              Confirm Password:
            </label>
            <input
              className={`register__input ${errors.confirmPassword && 'invalid'}`}
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              {...register('confirmPassword', {
                required: 'Confirm Password is required',
                validate: (value) => value === watchPassword,
              })}
              onKeyUp={() => {
                trigger('confirmPassword');
              }}
            />
          </div>
          {errors.confirmPassword && errors.confirmPassword.type === 'validate' && (
            <p className="register__error-message">Passwords do not match!</p>
          )}

          <div className="register__field">
            <label className="register__label" htmlFor="chooseCompany">
              Choose company:
            </label>
            <select
              name="chooseCompany"
              className={`register__input ${errors.chooseCompany && 'invalid'}`}
              id="chooseCompany"
              {...register('chooseCompany', {
                required: 'Choose one company please!',
              })}
            >
              <option value="">Please select</option>
              <option value="0">{watchUsername + "'s company (my company)"}</option>
              {companies.map((company) => {
                return (
                  <option key={company.id} value={company.id}>
                    {company.attributes.name}
                  </option>
                );
              })}
            </select>
          </div>
          {errors.chooseCompany && (
            <p className="register__error-message">{errors.chooseCompany.message}</p>
          )}

          <div className="register__field">
            <label className="register__label" htmlFor="upload_file">
              Profile Photo:
            </label>
            <Center>
              <Avatar name={currentUser?.imageName} src={profilePhoto} size="2xl" />
            </Center>
            <input
              type="file"
              id="upload_file"
              accept=".png, .jpg, .jpeg"
              placeholder="Upload File"
              {...register('image', { required: 'Image is required' })}
              onChange={(e) => handleFileSelected(e)}
            />
            {errors.image && <p className="register__error-message">{errors.image.message}</p>}
          </div>

          <div className="register__btn-conteiner">
            <Link to="/">
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
