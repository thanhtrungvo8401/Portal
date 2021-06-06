import axios from "axios";
import { actionCloseLoading, actionSetLoading } from "redux/actions/loadingActions";
import { actionSetIsLogined } from "redux/actions/loginActions"
import { storeClient } from "redux/store";
import { constAuth, constEnv } from "../utils/Constant";
import { getCookie, removeCookie } from "utils/Cookies";
import { handleErrorAPI } from "utils/Helper";

const configure = {
  baseURL: constEnv.API_URL,
  reponseType: "json",
};

export const API = axios.create(configure);

API.interceptors.request.use((req) => {
  const jwt = getCookie(constAuth.JWT);
  if (jwt) {
    req.headers[constAuth.AUTHORIZATION] = `${constAuth.BEARER} ${jwt}`;
  }
  storeClient.dispatch(actionSetLoading());
  // Important: request interceptors **must** return the request.
  return req;
});

API.interceptors.response.use(
  (res) => {
    storeClient.dispatch(actionCloseLoading());
    return res;
  },
  (err) => {
    storeClient.dispatch(actionCloseLoading());
    const status = handleErrorAPI(err).status;
    if (status === 401) {
      removeCookie(constAuth.JWT);
      storeClient.dispatch(actionSetIsLogined(false));
    }
    throw err;
  }
);
