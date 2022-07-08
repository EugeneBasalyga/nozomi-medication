import {
  useState, useEffect, useMemo, createContext, useContext,
} from 'react';
import PropTypes from 'prop-types';

import { useLocalStorage } from '../hooks/useLocalStorage';
import authApiInstance from '../services/api/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useLocalStorage('accessToken', null);
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

  const login = async (emailAddress, password) => {
    try {
      const data = await authApiInstance.login(emailAddress, password);
      setUser({ emailAddress: data.emailAddress });
      setAccessToken(data.accessToken);
      return data.accessToken;
    } catch (err) {
      return err.response.data;
    }
  };

  const logout = () => {
  };

  // const value = useMemo(
  //   () => ({
  //     user,
  //     isLoading,
  //     login,
  //     logout,
  //   }),
  //   [user, isLoading],
  // );

  const value = useMemo(
    () => {
      return {
        user,
        isLoading,
        login,
        logout,
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
