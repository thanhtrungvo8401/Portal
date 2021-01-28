import { combineReducers } from "redux";
import { historyReducer } from "./historyReducer";
import { loadingReducer } from "./loadingReducer";
// COMBINED REDUCERS
const reducers = {
  history: historyReducer,
  isLoading: loadingReducer,
};

export default combineReducers(reducers);
