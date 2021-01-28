import { CLOSE_COMPONENT_LOADING, SET_COMPONENT_LOADING } from "../types";

export const actionSetLoading = () => {
  return {
    type: SET_COMPONENT_LOADING,
  };
};

export const actionCloseLoading = () => {
  return {
    type: CLOSE_COMPONENT_LOADING,
  };
};
