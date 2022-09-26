import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  createContext,
  useContext,
  useRef,
} from 'react';
import PropTypes from 'prop-types';

import localStorageApiInstance from '../services/localStorage';
import sessionApiInstance from '../services/api/session';
import authApiInstance from '../services/api/auth';
import AuthContextRef from './authRef';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const innerRef = useRef(AuthContextRef.getInstance());

  const setUserContextData = useCallback(async () => {
    const userData = await sessionApiInstance.getCurrentSession();
    setUser(userData);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const accessToken = localStorageApiInstance.getAccessToken();
      const refreshToken = localStorageApiInstance.getRefreshToken();

      if (!accessToken && !refreshToken) {
        setLoading(false);
        return;
      }

      try {
        await setUserContextData();
      } catch {
        localStorageApiInstance.removeAccessToken();
        localStorageApiInstance.removeRefreshToken();
      } finally {
        setLoading(false);
      }
    };

    innerRef.current.ready = true;
    innerRef.current.reset = resetUserContextData;

    fetchData();
  }, [setUserContextData]);

  const resetUserContextData = () => {
    localStorageApiInstance.removeAccessToken();
    localStorageApiInstance.removeRefreshToken();

    setUser(null);
  };

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
      resetUserContextData();
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
        setUserContextData,
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
