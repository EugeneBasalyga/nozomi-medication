import { Outlet } from 'react-router-dom';

import styles from './AuthLayout.css';

const AuthLayout = () => {
  return (
    <div className={styles.authLayout}>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
