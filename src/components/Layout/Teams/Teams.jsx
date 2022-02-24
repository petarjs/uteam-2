import ProfileCard from './ProfileCard';
import classes from './Teams.module.scss';

const Team = () => {
  const listOfTeams = [
    {
      name: 'Dan Abramov',
      profileImg: 'https://bit.ly/dan-abramov',
      status: 'Published',
      date: '23rd 2021',
      id: 113,
    },
    {
      name: 'Mike Jones',
      profileImg: 'https://bit.ly/dan-abramov',
      status: 'Published',
      date: '25rd 2021',
      id: 555,
    },
    {
      name: 'Dan Abramov',
      profileImg: 'https://bit.ly/dan-abramov',
      status: 'Published',
      date: '23rd 2021',
      id: 155,
    },
  ];

  return (
    <section className={classes.teams}>
      <nav className={classes.teams__nav}>
        <h2>Team</h2>
        <button className={classes.teams__nav_button}>Add new team member</button>
      </nav>
      <main className={classes.teams__main}>
        <ul className={classes.teams__list}>
          {listOfTeams.map((profile) => (
            <ProfileCard
              profileName={profile.name}
              profileImg={profile.profileImg}
              status={profile.status}
              date={profile.date}
              key={profile.id}
            />
          ))}
        </ul>
      </main>
    </section>
  );
};

export default Team;

// TODO: 1. Teams page, Profile. ✔
// TODO: 2. Styles. ✔
// TODO: 3. ProfilesApi redux.
