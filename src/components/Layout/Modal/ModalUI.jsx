import { useNavigate } from 'react-router';

import classes from './ModalUI.module.scss';

const ModalUI = ({ onClose, route }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    onClose(false);
    navigate(route);
  };

  return (
    <div className={classes.modal}>
      <div className={classes.modal__content}>
        <h2>Thank you for filling the form! 🚀🤘</h2>
        <button className={classes.modal__button} onClick={() => handleClose()}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ModalUI;
