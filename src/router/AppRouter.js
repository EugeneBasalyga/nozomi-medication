import { useRoutes } from 'react-router-dom';

import { useRouterPaths } from '../hooks/useRouterPaths';
import { useAuth } from '../contexts/auth';

const AppRouter = () => {
  const auth = useAuth();

  // pass roles, etc. form context (?) to function
  const routers = useRouterPaths(auth);
  const routes = useRoutes(routers);

  return routers && routes;
};

export default AppRouter;
