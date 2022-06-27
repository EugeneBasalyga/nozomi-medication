import { Navigate } from 'react-router-dom';

import { LOGIN } from '../../../router/consts';

export const RedirectLogin = () => <Navigate to={LOGIN} />;
