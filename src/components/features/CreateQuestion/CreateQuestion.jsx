import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import classes from './CreateQuestion.module.scss';

import { usePostQuestionMutation, useGetQuestionsQuery } from 'services/questionApi';

const CreateQuestion = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [postQuestion] = usePostQuestionMutation();
  const { data } = useGetQuestionsQuery();
  const navigate = useNavigate();

  const lastQuestionOrder = data?.data?.slice(-1)?.[0]?.attributes?.order;

  const handlePostQuestion = async (data) => {
    try {
      let order = 0;

      if (lastQuestionOrder) {
        order = lastQuestionOrder + 1;
      }

      if (!lastQuestionOrder) {
        order++;
      }

      console.log(order, 'ORDER PRE SLANJA 🚀');

      const questionData = {
        ...data,
        order,
      };

      await postQuestion(questionData);
      navigate('/questions');
    } catch (err) {
      console.error(`${err.message}, 💥🤯`);
    }
  };

  return (
    <main className={classes.question}>
      <h2 className={classes.question__heading}>Add new Question</h2>
      <div className={classes.question__content}>
        <form
          onSubmit={handleSubmit((data) => handlePostQuestion(data))}
          className={classes.question__form}
        >
          <div className={classes.question__box}>
            <label htmlFor="text" className={classes.question__label}>
              Question text
            </label>
            <input
              {...register('text', { required: 'Text is required' })}
              placeholder="Question text"
              id="text"
              className={classes.question__input}
            />
            {errors.text && <p className={classes.question__error}>{errors.text.message}</p>}
          </div>
          <div className={classes.question__box}>
            <label htmlFor="type" className={classes.question__label}>
              Question type
            </label>
            <div className={classes.question__select}>
              <select {...register('type', { required: 'Type is required' })} id="type">
                <option value="">Select question type</option>
                <option value="text">Text</option>
                {/* FIXME: Ne radi kada je type value > long text, long-text, longtext, long_text */}
                <option value="long_text">Long text</option>
                <option value="image">Image</option>
              </select>
            </div>
            {errors.type && <p className={classes.question__error}>{errors.type.message}</p>}
          </div>
          <div className={classes.question__btnBox}>
            <button className={classes.question__button}>Save</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreateQuestion;
