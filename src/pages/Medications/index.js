import loadable from '@loadable/component';

const Medications = {
  MedicationsMain: loadable(() => import('./MedicationsMain'), {
    fallback: <>Loading...</>,
  }),
  MedicationObjectPage: loadable(() => import('./MedicationObjectPage'), {
    fallback: <>Loading...</>,
  }),
};

export default Medications;
