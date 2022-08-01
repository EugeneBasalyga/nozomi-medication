import { useState } from 'react';

import localStorageApiInstance from '../services/localStorage';

export const useAccessToken = (defaultValue) => {
  const [storedAccessToken, setStoredAccessToken] = useState(() => {
    try {
      if (defaultValue) {
        localStorageApiInstance.setValue('accessToken', defaultValue);
      }
      return defaultValue;
    } catch (err) {
      return err;
    }
  });
  const setAccessToken = (newValue) => {
    try {
      localStorageApiInstance.setValue('accessToken', newValue);
      setStoredAccessToken(newValue);
    } catch (err) {
      console.log(err);
    }
  };
  return [storedAccessToken, setAccessToken];
};
