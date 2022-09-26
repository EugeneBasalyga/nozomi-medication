import { Outlet } from 'react-router-dom';

import styles from './MedicationsLayout.scss';
import logo from '../../assets/pfizer-logo.png';

const MedicationsLayout = () => {
  return (
    <div className={styles.medicationsLayout}>
      <div className={styles.logoContainer}>
        <img className={styles.logoImage} src={logo} alt="Pfizer Logo" />
      </div>
      <Outlet />
    </div>
  );
};

export default MedicationsLayout;
