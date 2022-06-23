import loadable from '@loadable/component';

const Medications = {
  MedicationsList: loadable(() => import('./MedicationsList'), {
    fallback: <>Loading...</>,
  })
};

export default Medications;
