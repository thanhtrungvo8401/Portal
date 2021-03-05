import { CLOSE_LOGIN_FORM, SET_IS_LOGINED, SET_USER_LOGIN, SET_USER_SIGNUP, SHOW_LOGIN_FORM } from "../types";

const initialState = {
  showLogin: false,
  isLogined: false,
  userLogin: {},
  userSignUp: {}
};

export const loginReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case SHOW_LOGIN_FORM:
      return {
        ...state,
        showLogin: true,
      };
    case CLOSE_LOGIN_FORM:
      return  {
        ...state,
        showLogin: false,
      };
    case SET_IS_LOGINED:
     return {
        ...state,
        isLogined: action.payload,
      };
    case SET_USER_LOGIN:
      return {
        ...state,
        userLogin: {...action.payload}
      }
    case SET_USER_SIGNUP:
      return {
        ...state,
        userSignUp: {...action.payload}
      }
    default:
      return state;
  }
};
