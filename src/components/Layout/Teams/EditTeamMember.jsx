import { useParams } from 'react-router';

import EditAnswers from './EditAnswers';
import EditBasicInfo from './EditBasicInfo';
import classes from './EditTeamMember.module.scss';

const EditTeamMember = () => {
  const { memberId } = useParams();
  console.log(memberId, '🚀');

  return (
    <section className={classes.editTeam}>
      <nav className={classes.editTeam__nav}>
        <h2>Edit Team Member</h2>
        <div className={classes.editTeam__nav_box}>
          <div>
            <label htmlFor="status">Status</label>
            <select name="status" id="status-select" className={classes.editTeam__select}>
              <option value="published">Published</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <button className={classes.editTeam__button}>Delete</button>
        </div>
      </nav>
      <main className={classes.editTeam__main}>
        <EditBasicInfo memberId={memberId} />
        <EditAnswers memberId={memberId} />
      </main>
    </section>
  );
};

export default EditTeamMember;
