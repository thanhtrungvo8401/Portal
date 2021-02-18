import { RESET_ERROR, SET_ERROR } from "../types";

export const actionSetError = (payload) => ({
  type: SET_ERROR,
  payload,
});

export const actionResetError = () => ({
  type: RESET_ERROR,
});
