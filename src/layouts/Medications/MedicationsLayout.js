import { Outlet } from 'react-router-dom';

import './MedicationsLayout.css';

const MedicationsLayout = () => {
  return (
    <div className='medicationsLayout'>
      <Outlet />
    </div>
  );
};

export default MedicationsLayout;
