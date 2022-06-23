import './components/LoginForm/LoginForm.js'
import { AuthProvider } from './contexts/auth';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router/AppRouter';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
