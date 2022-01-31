import { useNavigate } from 'react-router';

import arrowDown from '../../../images/chevron-down-outline.svg';
import arrowUp from '../../../images/chevron-up-outline.svg';

import classes from './Questions.module.scss';

import { useGetQuestionsQuery } from 'services/questionApi';

function Questions() {
  const { data } = useGetQuestionsQuery();
  const navigate = useNavigate();

  const questions = data?.data;
  // console.log(questions, 'QUESTIONS KOMPONENTA 👀');
  // console.log(data, ' DATA CELA QUESTIONS KOMPONENTA 👀');

  // const questions2 = [
  //   { type: 'text', text: 'Do you have any pets?', order: 1 },
  //   { type: 'image', text: 'Take a picture of your Christmas tree', order: 2 },
  //   { type: 'text', text: 'Which city do you live in?', order: 3 },
  //   { type: 'long text', text: 'What is your favorite movie?', order: 4 },
  // ];

  return (
    <div className={classes.questions}>
      <nav className={classes.questions__nav}>
        <h2 className={classes.questions__heading}>Questions</h2>
        <div className={classes.questions__btn_box}>
          <button
            className={classes.questions__nav_button}
            onClick={() => navigate('/create/question')}
          >
            Add new question
          </button>
        </div>
      </nav>
      <main className={classes.questions__main}>
        <ul className={classes.questions__list}>
          {questions?.map((question) => (
            <li className={classes.questions__li} key={question.id}>
              <div className={classes.questions__container}>
                <div>
                  <div className={classes.questions__arrows}>
                    <img src={arrowUp} alt="Arrow Up" />
                    <img src={arrowDown} alt="Arrow Down" />
                  </div>
                  <div className={classes.questions__content}>
                    <small>
                      Question {question.attributes.order + 1} - {question.attributes.type}
                    </small>
                    <div>{question.attributes.text}</div>
                  </div>
                </div>
                <div className={classes.questions__buttons}>
                  <button className={classes.questions__buttons_edit}>Edit</button>
                  <button className={classes.questions__buttons_delete}>Delete</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default Questions;
