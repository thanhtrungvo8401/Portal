import { RESET_HISTORY, SET_HISTORY } from "../types";

export const historyReducer = (state = "", action) => {
  switch (action.type) {
    case SET_HISTORY:
      state = action.payload;
      return state;
    case RESET_HISTORY:
      state = "";
      return state;
    default:
      return state;
  }
};
