import { CLOSE_LOGIN_FORM, SHOW_LOGIN_FORM } from "../types";

const initialState = {
  showLogin: false,
};

export const loginReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case SHOW_LOGIN_FORM:
      state = {
        ...state,
        showLogin: true,
      };
      return state;
    case CLOSE_LOGIN_FORM:
      state = {
        ...state,
        showLogin: false,
      };
      return state;
    default:
      return state;
  }
};
