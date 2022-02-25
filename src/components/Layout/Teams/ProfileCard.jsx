import { Link } from 'react-router-dom';

import classes from './ProfileCard.module.scss';

import { API_URL } from 'config/config';
import { useGetProfileImgQuery } from 'services/profileApi';

const ProfileCard = ({ profileName, status, date, profileId, onDeleteProfile }) => {
  const { data, isFetching } = useGetProfileImgQuery(profileId);

  if (isFetching) {
    return <p>Loading...</p>;
  }

  return (
    <li className={classes.profile}>
      <div className={classes.profile__card}>
        <div className={classes.profile__img}>
          <img src={`${API_URL}${data?.url}`} alt={profileName} />
        </div>
        <div className={classes.profile__container}>
          <div className={classes.profile__container_content}>
            <div className={classes.profile__container_content_box}>
              <h4>{profileName}</h4>
              <p>Joined {date}</p>
            </div>
            {/* <p>{status}</p> TODO: Za sada je null*/}
            <p>{status}Published</p>
          </div>
          <div className={classes.profile__container_buttons}>
            <button className={classes.profile__container_buttons_edit}>
              <Link to={`/editTeamMember/${profileId}`}>Edit</Link>
            </button>
            <button className={classes.profile__container_buttons_delete} onClick={onDeleteProfile}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ProfileCard;
