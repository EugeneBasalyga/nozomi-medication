import { useMemo } from 'react';

import AuthLayout from '../layouts/Auth';
import { AUTH_ROUTES } from '../router/AuthRouter';
import { RedirectLogin } from '../pages/Redirect/RedirectLogin';
import MedicationsLayout from '../layouts/Medications';
import { MEDICATION_ROUTES } from '../router/MedicationsRouter';
import { RedirectMedications } from '../pages/Redirect/RedirectMedications';
import { NOT_FOUND } from '../router/consts';

export const useRouterPaths = (auth) => {
  return useMemo(() => {
    if (auth.isLoading) {
      return [];
    }

    const layout = auth.user ? <MedicationsLayout /> : <AuthLayout />;
    const routes = auth.user ? [
      ...MEDICATION_ROUTES,
      {
        path: NOT_FOUND,
        element: <RedirectMedications />,
      },
    ] : [
      ...AUTH_ROUTES,
      {
        path: NOT_FOUND,
        element: <RedirectLogin />,
      },
    ];

    return [{ element: layout, children: routes }];
  }, [auth.user, auth.isLoading]);
};
