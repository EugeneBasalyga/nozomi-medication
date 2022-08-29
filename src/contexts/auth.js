import {
  useState, useEffect, useMemo, createContext, useContext,
} from 'react';
import PropTypes from 'prop-types';

import localStorageApiInstance from '../services/localStorage';
import sessionApiInstance from '../services/api/session';
import authApiInstance from '../services/api/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    sessionApiInstance.getCurrentSession()
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
      localStorageApiInstance.setAccessToken(data.accessToken);
      localStorageApiInstance.setRefreshToken(data.refreshToken);
      return data.accessToken;
    } catch (err) {
      return err.response.data;
    }
  };

  const logout = async () => {
    try {
      const data = await authApiInstance.logout();
      setUser();
      localStorageApiInstance.removeAccessToken();
      localStorageApiInstance.removeRefreshToken();
      return data;
    } catch (err) {
      return err.response.data;
    }
  };

  const register = async (email, password, repeatPassword) => {
    try {
      const data = await authApiInstance.register(email, password, repeatPassword);
      setUser({ email: data.email });
      localStorageApiInstance.setAccessToken(data.accessToken);
      localStorageApiInstance.setRefreshToken(data.refreshToken);
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
