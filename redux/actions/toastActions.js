import { SET_CLOSE_TOAST, SET_OPEN_TOAST } from "../types";

export const actionOpenToast = (payload) => ({
  type: SET_OPEN_TOAST,
  payload,
});

export const actionCloseToast = () => ({
  type: SET_CLOSE_TOAST,
});
