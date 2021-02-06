import { RESET_ERROR, SET_ERROR } from "../types";

export const errorReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_ERROR:
      return { ...action.payload };
    case RESET_ERROR:
      return {};
    default:
      return state;
  }
};
