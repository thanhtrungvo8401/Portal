import { combineReducers } from "redux";
import { errorReducer } from "./errorReducer";
import { historyReducer } from "./historyReducer";
import { loadingReducer } from "./loadingReducer";
import { loginReducer } from "./loginReducer";
import { rememberGroupReducer } from "./rememberGroupReducer";
import { setVocasReducer } from "./SetVocasReducer";
import { toastReducer } from "./toastReducer";
import { userReducer } from "./userReducer";
import { vocaReducer } from "./vocaReducer";
// COMBINED REDUCERS
const reducers = {
  history: historyReducer,
  isLoading: loadingReducer,
  login: loginReducer,
  user: userReducer,
  toast: toastReducer,
  error: errorReducer,
  setVocas: setVocasReducer,
  vocas: vocaReducer,
  rememberGroup: rememberGroupReducer,
};

export default combineReducers(reducers);
