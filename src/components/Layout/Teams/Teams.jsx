import { Link } from 'react-router-dom';

import ProfileCard from './ProfileCard';
import classes from './Teams.module.scss';

import { useDeleteProfileMutation, useGetProfilesQuery } from 'services/profileApi';
import formatDate from 'utils/formatDate';

const Team = () => {
  const { data } = useGetProfilesQuery();
  const profiles = data?.data;

  const [deleteProfile] = useDeleteProfileMutation();

  console.log(profiles, '🚀🤘');

  return (
    <section className={classes.teams}>
      <nav className={classes.teams__nav}>
        <h2>Team</h2>
        <Link to={`/addNewTeamMember`}>
          <button className={classes.teams__nav_button}>Add new team member</button>
        </Link>
      </nav>
      <main className={classes.teams__main}>
        <ul className={classes.teams__list}>
          {profiles?.map((profile) => (
            <ProfileCard
              profileName={profile.attributes.name}
              status={profile.attributes.status}
              date={formatDate(profile.attributes.createdAt)}
              key={profile.id}
              profileId={profile.id}
              onDeleteProfile={() => deleteProfile(profile.id)}
            />
          ))}
        </ul>
      </main>
    </section>
  );
};

export default Team;

// TODO: 1. Teams page, ProfileCard. ✔
// TODO: 2. Styles. ✔
// TODO: 3. ProfilesApi redux. ✔
// TODO: 4. AddNewTeamMember
