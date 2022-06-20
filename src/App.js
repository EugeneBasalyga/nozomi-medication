import './App.css';
import './components/LoginForm.js'
import { AuthProvider } from './components/auth';
import LoginForm from './components/LoginForm.js';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';

const App = () => {
  return (
    <AuthProvider>
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProtectedRoute><h2>Home</h2></ProtectedRoute>} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/about" element={<ProtectedRoute><h2>About</h2></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
