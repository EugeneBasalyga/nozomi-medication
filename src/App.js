import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

import './components/LoginForm/LoginForm';
import { AuthProvider } from './contexts/auth';
import AppRouter from './router/AppRouter';

axios.defaults.baseURL = 'http://localhost:3001';

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
