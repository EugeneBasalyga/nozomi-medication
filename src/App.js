import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from './contexts/auth';
import AppRouter from './router/AppRouter';
import GlobalNotify from './components/Common/Notification/GlobalNotify';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
      <GlobalNotify />
    </AuthProvider>
  );
};

export default App;
