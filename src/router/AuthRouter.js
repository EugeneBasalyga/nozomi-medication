import Auth from '../pages/Auth';
import { LOGIN, REGISTER } from './consts';

export const AUTH_ROUTES = [
  {
    index: true,
    path: LOGIN,
    element: <Auth.Login />,
  },
  {
    index: true,
    path: REGISTER,
    element: <Auth.Register />,
  },
];
