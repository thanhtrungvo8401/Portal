import { combineReducers } from "redux";
import { historyReducer } from "./historyReducer";
import { loadingReducer } from "./loadingReducer";
import { loginReducer } from "./loginReducer";
import { userReducer } from "./userReducer";
// COMBINED REDUCERS
const reducers = {
  history: historyReducer,
  isLoading: loadingReducer,
  login: loginReducer,
  user: userReducer,
};

export default combineReducers(reducers);
