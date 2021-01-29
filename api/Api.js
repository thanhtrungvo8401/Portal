import axios from "axios";
import {
  actionCloseLoading,
  actionSetLoading,
} from "../redux/actions/loadingActions";
import { constAuth, constEnv } from "../utils/Constant";
import { getCookie, removeCookie } from "../utils/Cookies";
import { handleErrorAPI, navigate } from "../utils/Helper";
import { appUrl } from "../utils/URL";

const configure = {
  baseURL: constEnv.API_URL,
  reponseType: "json",
};

const store = initializeStore();

export const API = axios.create(configure);

API.interceptors.request.use((req) => {
  const jwt = getCookie(constAuth.JWT);
  if (jwt) {
    req.headers[constAuth.AUTHORIZATION] = `${constAuth.BEARER} ${jwt}`;
  }
  store.dispatch(actionSetLoading());
  // Important: request interceptors **must** return the request.
  return req;
});

API.interceptors.response.use(
  (res) => {
    store.dispatch(actionCloseLoading());
    return res;
  },
  (err) => {
    store.dispatch(actionCloseLoading());
    const status = handleErrorAPI(err).status;
    if (status === 401) {
      removeCookie(constAuth.JWT);
      navigate(appUrl.setVocaList());
    }
    throw err;
  }
);
