import { userModel } from "../../model/UserModel";
import { RESET_USER, SET_USER } from "../types";

const initState = { ...userModel };

export const userReducer = (state = { ...initState }, action) => {
  switch (action.type) {
    case SET_USER:
      state = {
        ...state,
        ...action.payload,
      };
      return state;
    case RESET_USER:
      state = { ...initState };
      return state;
    default:
      return state;
  }
};
