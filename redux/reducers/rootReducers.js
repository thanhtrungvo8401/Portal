import { combineReducers } from "redux";
import { historyReducer } from "./historyReducers";
// COMBINED REDUCERS
const reducers = {
  history: historyReducer,
};

export default combineReducers(reducers);
