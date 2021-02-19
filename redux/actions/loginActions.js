import { CLOSE_LOGIN_FORM, SET_IS_LOGINED, SHOW_LOGIN_FORM } from "../types";

export const actionShowLogin = () => {
  return {
    type: SHOW_LOGIN_FORM,
  };
};

export const actionCloseLogin = () => {
  return {
    type: CLOSE_LOGIN_FORM,
  };
};

export const actionSetIsLogined = (payload) => {
  return {
    type: SET_IS_LOGINED,
    payload,
  };
};
