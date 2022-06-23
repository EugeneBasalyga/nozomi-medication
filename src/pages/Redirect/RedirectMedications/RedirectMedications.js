import { Navigate } from 'react-router-dom';

import { MEDICATIONS } from '../../../router/consts';

export const RedirectMedications = () => <Navigate to={MEDICATIONS} />;