import { isServer } from "./Helper";
export const sessionStorageHelper = {
  set: (key, value) => {
    return !isServer && sessionStorage.setItem(key, value);
  },
  get: (key) => {
    return !isServer && sessionStorage.getItem(key);
  },
  remove: (key) => {
    return !isServer && sessionStorage.removeItem(key);
  },
};

export const localStorageHelper = {
  set: (key, value) => {
    return !isServer && localStorage.setItem(key, value);
  },
  get: (key) => {
    return !isServer && localStorage.getItem(key);
  },
  remove: (key) => {
    return !isServer && localStorage.removeItem(key);
  },
  clearAll: () => {
    return !isServer && localStorage.clear();
  },
};
