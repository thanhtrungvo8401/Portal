import { SET_CLOSE_TOAST, SET_OPEN_TOAST } from "../types";

const initState = {
  open: false,
  content: "",
  type: "error",
};

export const toastReducer = (state = { ...initState }, action) => {
  switch (action.type) {
    case SET_OPEN_TOAST:
      state = {
        ...action.payload,
        open: true,
      };
      return state;
    case SET_CLOSE_TOAST:
      state = {
        ...state,
        open: false,
      };
      return state;
    default:
      return state;
  }
};
