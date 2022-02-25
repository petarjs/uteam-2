/* eslint-disable no-unused-vars */
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import classes from './EditBasicInfo.module.scss';

import { useEditProfileMutation } from 'services/profileApi';

const EditBasicInfo = ({ memberId }) => {
  console.log(memberId, 'EditBasic');
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm();

  const [editProfile] = useEditProfileMutation();
  const [buttonText, setButtonText] = useState('Save');

  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

  const handleEditBasicInfo = (data) => {
    const uploadFileData = new FormData();
    uploadFileData.append('files', data.image[0]);

    // console.log(data, 'DATA');
    const newProfileData = {
      profileId: memberId,
      profileData: {
        name: data.name,
        profilePhoto: uploadFileData,
      },
    };

    editProfile(newProfileData);
    setButtonText('Saved');
  };

  const buttonClasses = clsx({
    [classes.editBasicInfo__btnSave]: true,
    [classes.editBasicInfo__btnSaved]: buttonText === 'Saved',
  });

  return (
    <section className={classes.editBasicInfo}>
      <div className={classes.editBasicInfo__content}>
        <h4>Basic Info</h4>
        <form className={classes.editBasicInfo__form}>
          <div className={classes.editBasicInfo__box}>
            <label htmlFor="text" className={classes.editBasicInfo__label}>
              Name
            </label>
            <input
              {...register('name', {
                required: 'Name is required',
                minLength: {
                  value: 6,
                  message: 'Min 6 characters long.',
                },
                maxLength: {
                  value: 15,
                  message: 'Max 15 characters.',
                },
              })}
              type="text"
              id="name"
              placeholder="Member Name"
              className={classes.editBasicInfo__input}
            />
            {errors.name && <p className={classes.editBasicInfo__error}>{errors.name.message}</p>}
          </div>
          <div className={classes.editBasicInfo__box}>
            <label htmlFor="image" className={classes.editBasicInfo__label}>
              Profile Photo
            </label>
            <input
              {...register('image', { required: 'Image is required' })}
              type="file"
              id="image"
              accept=".png, .jpg, .jpeg"
              className={classes.editBasicInfo__input}
            />
            {errors.image && <p className={classes.editBasicInfo__error}>{errors.image.message}</p>}
          </div>
          <div className={classes.editBasicInfo__btnBox}>
            <button
              className={buttonClasses}
              onClick={handleSubmit((data) => handleEditBasicInfo(data))}
            >
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditBasicInfo;
