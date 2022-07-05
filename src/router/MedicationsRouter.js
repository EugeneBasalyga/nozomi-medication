import Medications from '../pages/Medications';
import { MEDICATIONS } from './consts';

export const MEDICATION_ROUTES = [
  {
    index: true,
    path: MEDICATIONS,
    element: <Medications.MedicationsMain />,
  },
];
