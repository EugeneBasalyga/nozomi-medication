import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './GlobalNotify.scss';

export const sendNotify = (message, type) => {
  switch (type) {
    case 'info':
      toast.info(message);
      break;
    case 'success':
      toast.success(message);
      break;
    default:
      break;
  }
};

const GlobalNotify = () => (
  <ToastContainer
    className={styles.toastContainer}
    toastClassName={styles.toast}
    position="bottom-center"
    autoClose={3000}
    closeButton={false}
    hideProgressBar
    newestOnTop
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
  />
);

export default GlobalNotify;
