import { useNavigate } from 'react-router';

import arrowDown from '../../../images/chevron-down-outline.svg';
import arrowUp from '../../../images/chevron-up-outline.svg';

import classes from './Questions.module.scss';

import { useQuestionEditContext } from 'context/QuestionEditContext';
import { useGetQuestionsQuery, useDeleteQuestionsMutation } from 'services/questionApi';

function Questions() {
  const { data } = useGetQuestionsQuery();
  const questionsFromApi = data?.data;
  const [deleteQuestion] = useDeleteQuestionsMutation();
  const navigate = useNavigate();

  const { handleIdAndOrder } = useQuestionEditContext();

  console.log(questionsFromApi, 'Data from API 🚀🚀');

  const handleEdit = ({ id, attributes: { order, text } }) => {
    handleIdAndOrder({ id, order, text });
    navigate('/edit/question');
  };

  const handleDelete = async (id) => {
    try {
      await deleteQuestion(id);
    } catch (err) {
      console.error(`${err.message}, 💥🤯`);
    }
  };

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
          {questionsFromApi?.map((question, i) => (
            <li className={classes.questions__li} key={i}>
              <div className={classes.questions__container}>
                <div>
                  <div className={classes.questions__arrows}>
                    <img src={arrowUp} alt="Arrow Up" />
                    <img src={arrowDown} alt="Arrow Down" />
                  </div>
                  <div className={classes.questions__content}>
                    <small>
                      Question {i + 1} - {question.attributes.type}
                    </small>
                    <div>{question.attributes.text}</div>
                  </div>
                </div>
                <div className={classes.questions__buttons}>
                  <button
                    className={classes.questions__buttons_edit}
                    onClick={() => handleEdit(question)}
                  >
                    Edit
                  </button>
                  <button
                    className={classes.questions__buttons_delete}
                    onClick={() => handleDelete(question.id)}
                  >
                    Delete
                  </button>
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
