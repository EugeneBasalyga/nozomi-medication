import { useMemo, createContext, useContext } from 'react';
import PropTypes from 'prop-types';

import { useLocalStorage } from '../hooks/useLocalStorage';
import HttpService from '../services/http';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage('jwtToken', null);

  const login = async (emailAddress, password) => {
    try {
      const http = new HttpService('http://localhost:3001');
      const res = await http.post('/login', { emailAddress, password });
      setToken(res.data.token);
      http.axios.defaults.headers.common.Authorization = `Bearer${res.data.token}`;
      return res.data.token;
    } catch (err) {
      return err.response.data;
    }
  };

  const logout = () => {
  };

  const value = useMemo(
    () => ({
      token,
      login,
      logout,
    }),
    [token],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
