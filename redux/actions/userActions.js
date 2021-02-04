import { SET_USER } from "../types";

export const actionSetUser = (payload) => {
  return {
    type: SET_USER,
    payload,
  };
};

export const actionResetUser = () => {
  return {
    type: RESET_HISTORY,
  };
};
