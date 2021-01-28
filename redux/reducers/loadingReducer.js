import { CLOSE_COMPONENT_LOADING, SET_COMPONENT_LOADING } from "../types";

export const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case SET_COMPONENT_LOADING:
      state = true;
      return state;
    case CLOSE_COMPONENT_LOADING:
      state = false;
      return state;
    default:
      return state;
  }
};
