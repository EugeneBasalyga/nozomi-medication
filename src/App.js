import { BrowserRouter } from 'react-router-dom';

import './components/LoginForm/LoginForm';
import { AuthProvider } from './contexts/auth';
import AppRouter from './router/AppRouter';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
