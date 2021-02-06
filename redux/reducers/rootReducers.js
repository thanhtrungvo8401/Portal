import { combineReducers } from "redux";
import { historyReducer } from "./historyReducer";
import { loadingReducer } from "./loadingReducer";
import { loginReducer } from "./loginReducer";
import { toastReducer } from "./toastReducer";
import { userReducer } from "./userReducer";
// COMBINED REDUCERS
const reducers = {
  history: historyReducer,
  isLoading: loadingReducer,
  login: loginReducer,
  user: userReducer,
  toast: toastReducer,
};

export default combineReducers(reducers);
