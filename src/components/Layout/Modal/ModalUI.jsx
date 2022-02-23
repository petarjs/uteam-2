import classes from './ModalUI.module.scss';

const ModalUI = ({ onClose }) => {
  return (
    <div className={classes.modal}>
      <div className={classes.modal__content}>
        <h2>Thank you for filling the form! 🚀🤘</h2>
        <button className={classes.modal__button} onClick={() => onClose(false)}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ModalUI;
