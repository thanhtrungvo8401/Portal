import { SET_HISTORY } from "../types";

export const actionSetHistory = (url) => {
  return {
    type: SET_HISTORY,
    payload: url,
  };
};

export const actionResetHistory = () => {
  return {
    type: RESET_HISTORY,
  };
};
