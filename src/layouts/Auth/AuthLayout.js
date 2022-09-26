import { Outlet } from 'react-router-dom';

import styles from './AuthLayout.scss';
import logo from '../../assets/pfizer-logo.png';

const AuthLayout = () => {
  return (
    <div className={styles.authLayout}>
      <div className={styles.logoContainer}>
        <img className={styles.logoImage} src={logo} alt="Pfizer Logo" />
      </div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
