/* eslint-disable no-unused-vars */

import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useForm } from 'react-hook-form';

import classes from './AddNewTeamMember.module.scss';

import ModalUI from 'components/Layout/Modal/ModalUI';
import { getCompany } from 'services/company';
import { getProfileId, getUserStats } from 'services/getUser';
import { usePostProfileMutation } from 'services/profileApi';

const AddNewTeamMember = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm();

  const [profileImg, setProfileImg] = useState('https://bit.ly/dan-abramov');
  const [postProfile] = usePostProfileMutation();
  const [ids, setIds] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

  useEffect(() => {
    const getIdsAndSet = async () => {
      const userStats = await getUserStats();
      const profileId = await getProfileId(userStats.id);
      const companyId = await getCompany(profileId);

      console.log(userStats.id, 'userStats ID');
      console.log(profileId, 'profileId ID');
      console.log(companyId, 'companyId ID');

      setIds({
        userId: userStats?.id,
        companyId: companyId.data[0]?.id,
      });
    };

    getIdsAndSet();
  }, []);

  console.log(ids, 'IDSSSS');

  const handleAddNewMember = (data) => {
    const uploadFileData = new FormData();
    uploadFileData.append('files', data.image[0]);

    const profileData = {
      name: data.name,
      profilePhoto: uploadFileData,
      company: ids.companyId,
      user: ids.userId,
    };

    postProfile(profileData);
    setIsModalOpen(true);
  };

  const handleFileSelected = (e) => {
    const files = Array.from(e.target.files);
    if (files && files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        setProfileImg(e.target.result);
      };

      reader.readAsDataURL(files[0]);
    } else {
      setProfileImg('https://bit.ly/dan-abramov');
    }
  };

  return (
    <section className={classes.addMember}>
      <div className={classes.addMember__content}>
        <h2>Add New Member Profile</h2>
        <form className={classes.addMember__form}>
          <div className={classes.addMember__box}>
            <label htmlFor="text" className={classes.addMember__label}>
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
              className={classes.addMember__input}
            />
            {errors.name && <p className={classes.addMember__error}>{errors.name.message}</p>}
          </div>
          <div className={classes.answers__box}>
            <label htmlFor="image" className={classes.addMember__label}>
              Add Member Image
            </label>
            <div className={classes.addMember__img}>
              <img alt="User" src={profileImg} size="2xl" />
            </div>
            <input
              {...register('image', { required: 'Image is required' })}
              type="file"
              id="image"
              accept=".png, .jpg, .jpeg"
              onChange={(e) => handleFileSelected(e)}
              className={classes.answers__input}
            />
            {errors.image && <p className={classes.addMember__error}>{errors.image.message}</p>}
          </div>
          <div className={classes.addMember__btnBox}>
            <button
              className={classes.addMember__button}
              onClick={handleSubmit((data) => handleAddNewMember(data))}
            >
              Save
            </button>
          </div>
        </form>
      </div>
      {isModalOpen &&
        ReactDOM.createPortal(
          <ModalUI onClose={setIsModalOpen} route={'/teams'} />,
          document.getElementById('modal-root')
        )}
    </section>
  );
};

export default AddNewTeamMember;
