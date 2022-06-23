import { useMemo } from 'react';
import { useAuth } from '../contexts/auth';

import AuthLayout from '../layouts/Auth';
import { AUTH_ROUTES } from '../router/AuthRouter';
import { RedirectLogin } from '../pages/Redirect/RedirectLogin';

import MedicationsLayout from '../layouts/Medications';
import { MEDICATION_ROUTES } from '../router/MedicationsRouter';
import { RedirectMedications } from '../pages/Redirect/RedirectMedications';

import { NOT_FOUND } from '../router/consts';

export const useRouterPaths = () => {
    const auth = useAuth();

    return useMemo(() => {

        if (!auth.value.user || (auth.value.user.emailAddress !== "test@gmail.com" || auth.value.user.password !== "123")) {
            const authRoutes = [
                ...AUTH_ROUTES,
                {
                    path: NOT_FOUND,
                    element: <RedirectLogin />,
                },
            ];
    
            const authLayout = <AuthLayout />;
    
            return [{ element: authLayout, children: authRoutes }];
        } else {
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

    }, [auth]);

}


