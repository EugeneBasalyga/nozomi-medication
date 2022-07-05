import loadable from '@loadable/component';

const Medications = {
  MedicationsMain: loadable(() => import('./MedicationsMain'), {
    fallback: <>Loading...</>,
  }),
};

export default Medications;
