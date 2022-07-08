import { useState } from 'react';

export const useLocalStorage = (keyName, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      }
      return defaultValue;
    } catch (err) {
      return err;
    }
  });
  const setValue = (newValue) => {
    try {
      window.localStorage.setItem(keyName, newValue);
      setStoredValue(newValue);
    } catch (err) {
      console.log(err);
    }
  };
  return [storedValue, setValue];
};
