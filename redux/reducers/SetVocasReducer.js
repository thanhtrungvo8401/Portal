import { RESET_GROUP_VOCAS_LIST, SET_GROUP_VOCAS_LIST } from "../types";

export const setVocasReducer = (state = [], action) => {
  switch (action.type) {
    case SET_GROUP_VOCAS_LIST:
      state = [...action.payload];
      return state;
    case RESET_GROUP_VOCAS_LIST:
      state = [];
      return state;
    default:
      return state;
  }
};
