import {
  useState, useEffect, useMemo, createContext, useContext,
} from 'react';
import PropTypes from 'prop-types';

import { useAccessToken } from '../hooks/useAccessToken';
import authApiInstance from '../services/api/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useAccessToken();
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    authApiInstance.getCurrentUser()
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const login = async (email, password) => {
    try {
      const data = await authApiInstance.login(email, password);
      setUser({ email: data.email });
      setAccessToken(data.accessToken);
      return data.accessToken;
    } catch (err) {
      return err.response.data;
    }
  };

  const logout = async () => {
    try {
      const data = await authApiInstance.logout();
      setUser();
      setAccessToken('');
      return data;
    } catch (err) {
      return err.response.data;
    }
  };

  const register = async (email, password, repeatPassword) => {
    try {
      const data = await authApiInstance.register(email, password, repeatPassword);
      setUser({ email: data.email });
      setAccessToken(data.accessToken);
      return data.accessToken;
    } catch (err) {
      return err.response.data;
    }
  };

  const value = useMemo(
    () => {
      return {
        user,
        isLoading,
        login,
        logout,
        register,
      };
    },
    [user, isLoading],
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
