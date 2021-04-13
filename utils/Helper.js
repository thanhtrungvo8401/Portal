import { actionSetHistory } from "../redux/actions/historyActions";
import {
  actionCloseLogin,
  actionShowLogin,
} from "../redux/actions/loginActions";
import { toast } from "../components/Toast";
import { storeClient } from "../redux/store";
import { codeToMessages } from "./CodeToMessages";
import { constAuth } from "./Constant";
import { getCookie } from "./Cookies";

export const navigate = (url) => {
  if (!isServer) {
    storeClient.dispatch(actionSetHistory(url));
  }
};

export const showLoginForm = () => {
  if (!isServer) {
    storeClient.dispatch(actionShowLogin());
  }
};

export const closeLoginForm = () => {
  if (!isServer) {
    storeClient.dispatch(actionCloseLogin());
  }
};

export const handleErrorAPI = (err, isToast = false) => {
  const object = err.response || {};
  const errorCodes = object.data ? object.data.errorCodes || [] : [];
  if (isToast) {
    let toastError = "";
    errorCodes.forEach((ob) => {
      if (ob.field === "announceField") {
        toastError = codeToMessages(ob.code);
      }
    });
    toast.error(toastError);
  }
  const errorCodesObject = {};
  errorCodes.forEach((ob) => {
    errorCodesObject[ob.field] = ob.code;
  });
  if (!isPro) {
    console.log(err);
  }
  return {
    status: object.status,
    message: object.data ? object.data.message || "" : "",
    errorCodesObject: errorCodesObject,
    details: object.data ? object.data.details || "" : "",
  };
};

export const isLogined = () => {
  const jwt = !isServer && getCookie(constAuth.JWT);
  return Boolean(jwt);
};

export const removeGmailTag = (email = "") => {
  if (!email) return "NULL";
  const index = email.indexOf("@");
  return email.slice(0, index);
};

export const isServer = typeof window === "undefined";

export const isPro = process.env.NEXT_PUBLIC_ENV === "PRODUCTION";
