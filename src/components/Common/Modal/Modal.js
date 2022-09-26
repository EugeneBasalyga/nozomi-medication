import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import clsx from 'clsx';

import styles from './Modal.scss';

const Modal = ({
  show,
  onClose,
  title,
  children,
  modalContentClassName,
  footerContentContainer,
}) => {
  return ReactDOM.createPortal(
    <CSSTransition
      in={show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
      classNames={{
        enterDone: styles.enterDone,
        exitDone: styles.exitDone,
      }}
    >
      <div className={styles.modal} onClick={onClose}>
        <div
          className={clsx(styles.modalContent, modalContentClassName)}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.modalHeader}>
            <h4 className={styles.modalTitle}>{title}</h4>
          </div>
          <div className={styles.modalBody}>{children}</div>
          {footerContentContainer}
        </div>
      </div>
    </CSSTransition>,
    document.getElementById('root'),
  );
};

export default Modal;
