import loadable from '@loadable/component';

const Auth = {
  Login: loadable(() => import('./Login'), {
    fallback: <>Loading...</>,
  }),
  Register: loadable(() => import('./Register'), {
    fallback: <>Loading...</>,
  }),
};

export default Auth;
