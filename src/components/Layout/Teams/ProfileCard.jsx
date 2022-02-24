import classes from './ProfileCard.module.scss';

const ProfileCard = ({ profileName, profileImg, status, date }) => {
  return (
    <li className={classes.profile}>
      <div className={classes.profile__card}>
        <div className={classes.profile__img}>
          <img src={profileImg} alt={profileName} />
        </div>
        <div className={classes.profile__container}>
          <div className={classes.profile__container_content}>
            <div className={classes.profile__container_content_box}>
              <h4>{profileName}</h4>
              <p>Joined {date}</p>
            </div>
            <p>{status}</p>
          </div>
          <div className={classes.profile__container_buttons}>
            <button className={classes.profile__container_buttons_edit}>Edit</button>
            <button className={classes.profile__container_buttons_delete}>Delete</button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ProfileCard;
