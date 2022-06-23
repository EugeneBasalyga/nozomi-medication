import { Outlet } from 'react-router-dom';
import './AuthLayout.css';

const AuthLayout = () => {
  return (
    <div className='authLayout'>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
