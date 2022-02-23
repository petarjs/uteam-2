/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import AnswerInput from './AnswerInput';
import classes from './AnswersForm.module.scss';

import { useAnswersContext } from 'context/AnswersContext.jsx';
import { usePostAnswerMutation } from 'services/answersApi';

const AnswersForm = ({ data }) => {
  const { question, profileId, page, totalPages, prevPage, nextPage, setIsModalOpen } = data;
  const { answers, handleAddAnswer } = useAnswersContext();
  const [postAnswer] = usePostAnswerMutation();
  const [answersIsReadyForPost, setAnswersIsReadyForPost] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm();

  useEffect(() => {
    setFocus('text');
  }, [setFocus]);

  useEffect(() => {
    if (answersIsReadyForPost) {
      answers.forEach((answer) => postAnswer(answer));
    }
  }, [answersIsReadyForPost, postAnswer]);

  const handleNextPageAndPost = (data) => {
    const uploadFileData = new FormData();

    if (typeof data.text === 'object') {
      uploadFileData.append('files', data.text[0]);
    }

    const answer = [
      {
        question: question.id + '',
        profile: profileId,
        answer: typeof data.text === 'object' ? uploadFileData : data.text,
        // answer: null,
      },
    ];

    // if ('image' in data) {
    //   uploadFileData.append('files', data.image[0]);
    //   answer[0].answer = uploadFileData;
    // } else {
    //   answer[0].answer = data.text;
    // }

    handleAddAnswer(answer);

    if (page !== totalPages) {
      nextPage();
      setAnswersIsReadyForPost(false);
    }
    if (page === totalPages) {
      setAnswersIsReadyForPost(true);
      console.log('READY 🌟🌟🌟');
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <form className={classes.answers__form}>
        <div className={classes.answers__box}>
          <label htmlFor={question.attributes.type} className={classes.answers__label}>
            {question.attributes.text}
          </label>
          <AnswerInput inputType={question.attributes.type} register={register} />
          {errors.text && <p className={classes.answers__error}>{errors.text.message}</p>}
        </div>
        <div className={classes.answers__box}>
          {errors.type && <p className={classes.answers__error}>{errors.type.message}</p>}
        </div>
        <div className={classes.answers__btnBox}>
          {page > 1 ? (
            <button className={classes.answers__button} onClick={() => prevPage()}>
              Prev
            </button>
          ) : (
            ''
          )}
          <button
            className={classes.answers__button}
            onClick={handleSubmit((data) => handleNextPageAndPost(data))}
          >
            {page === totalPages ? 'Save' : 'Next'}
          </button>
        </div>
      </form>
    </>
  );
};

export default AnswersForm;
