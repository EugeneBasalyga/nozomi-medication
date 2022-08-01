import Medications from '../pages/Medications';
import { MEDICATIONS, MEDICATION } from './consts';

export const MEDICATION_ROUTES = [
  {
    index: true,
    path: MEDICATIONS,
    element: <Medications.MedicationsMain />,
  },
  {
    index: true,
    path: MEDICATION,
    element: <Medications.MedicationObjectPage />,
  },
];
