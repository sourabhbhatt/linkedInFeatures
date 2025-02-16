import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

// Helper functions to interact with MMKV
export const setItem = (key: string, value: any) => {
  storage.set(key, JSON.stringify(value));
};

export const getItem = <T>(key: string): T | null => {
  const storedValue = storage.getString(key);
  return storedValue ? JSON.parse(storedValue) : null;
};

export const removeItem = (key: string) => {
  storage.delete(key);
};
