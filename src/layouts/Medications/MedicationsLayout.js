import { Outlet } from 'react-router-dom';

import styles from './MedicationsLayout.scss';

const MedicationsLayout = () => {
  return (
    <div className={styles.medicationsLayout}>
      <Outlet />
    </div>
  );
};

export default MedicationsLayout;
