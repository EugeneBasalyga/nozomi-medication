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
    if (auth.token) {
      const medicationRoutes = [
        ...MEDICATION_ROUTES,
        {
          path: NOT_FOUND,
          element: <RedirectMedications />,
        },
      ];

      const medicationsLayout = <MedicationsLayout />;

      return [{ element: medicationsLayout, children: medicationRoutes }];
    }

    const authRoutes = [
      ...AUTH_ROUTES,
      {
        path: NOT_FOUND,
        element: <RedirectLogin />,
      },
    ];

    const authLayout = <AuthLayout />;

    return [{ element: authLayout, children: authRoutes }];
  }, [auth]);
};
