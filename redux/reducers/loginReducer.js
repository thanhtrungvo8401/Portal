import { CLOSE_LOGIN_FORM, SET_IS_LOGINED, SHOW_LOGIN_FORM } from "../types";

const initialState = {
  showLogin: false,
  isLogined: false,
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
    case SET_IS_LOGINED:
      state = {
        ...state,
        isLogined: action.payload,
      };
    default:
      return state;
  }
};
