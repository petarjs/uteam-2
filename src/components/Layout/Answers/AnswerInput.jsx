import classes from './AnswerInput.module.scss';

const AnswerInput = ({ inputType, register }) => {
  const inputTypeText = (
    <input
      {...register('text', { required: 'Answer is required' })}
      placeholder="Answer text"
      id="text"
      className={classes.answer__input}
      type="text"
    />
  );

  const textArea = (
    <textarea
      {...register('text', { required: 'Answer is required' })}
      placeholder="Answer text"
      id="text"
      className={classes.answer__input}
      type="text"
      rows="10"
      cols="200"
    />
  );

  const inputTypeFile = (
    <input
      // FIXME: ...register('image') > don't work.
      {...register('text', { required: 'Image is required' })}
      placeholder="Upload File"
      id="image"
      className={classes.answers__input}
      type="file"
      accept=".png, .jpg, .jpeg"
    />
  );

  if (inputType === 'text') {
    return inputTypeText;
  }
  if (inputType === 'long_text') {
    return textArea;
  }
  if (inputType === 'image') {
    return inputTypeFile;
  }
};

export default AnswerInput;
