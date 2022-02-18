import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import arrowDown from '../../../images/chevron-down-outline.svg';
import arrowUp from '../../../images/chevron-up-outline.svg';

import classes from './Answers.module.scss';

const Answers = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm();

  useEffect(() => {
    setFocus('text');
  }, [setFocus]);

  const handleAnswer = (data) => {
    console.log(data);
  };

  return (
    <main className={classes.answers}>
      <h2 className={classes.answers__heading}>Quantox&apos;s team</h2>
      <div className={classes.answers__content}>
        <div className={classes.answers__arrows}>
          <img src={arrowUp} alt="Arrow Up" />
          <span>1/5</span>
          <img src={arrowDown} alt="Arrow Down" />
        </div>
        <form
          onSubmit={handleSubmit((data) => handleAnswer(data))}
          className={classes.answers__form}
        >
          <div className={classes.answers__box}>
            <label htmlFor="text" className={classes.answers__label}>
              Do you have any pets?
            </label>
            <input
              {...register('text', { required: 'Text is required' })}
              placeholder="Answer text"
              id="text"
              className={classes.answers__input}
            />
            {errors.text && <p className={classes.answers__error}>{errors.text.message}</p>}
          </div>
          <div className={classes.answers__box}>
            {errors.type && <p className={classes.answers__error}>{errors.type.message}</p>}
          </div>
          <div className={classes.answers__btnBox}>
            <button className={classes.answers__button}>Next</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Answers;
