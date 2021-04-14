import { isServer } from "./Helper";

export const paramsHelper = {
  set: (key, value) => {
    if (isServer) return null;
    try {
      const url = new URL(window.location);
      const params = new URLSearchParams(url.search);
      params.set(key, value);
      window.history.pushState({}, "", url.pathname + "?" + params.toString());
    } catch (err) {}
  },
  get: (key) => {
    if (isServer) return null;
    const url = new URL(window.location);
    const params = new URLSearchParams(url.search);
    return params.get(key);
  },
};
