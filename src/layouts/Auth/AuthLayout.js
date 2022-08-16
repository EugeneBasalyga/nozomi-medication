import { Outlet } from 'react-router-dom';

import styles from './AuthLayout.scss';

const AuthLayout = () => {
  return (
    <div className={styles.authLayout}>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
