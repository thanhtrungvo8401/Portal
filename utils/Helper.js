import { actionSetHistory } from "../redux/actions/historyActions";
import { initializeStore } from "../redux/store";
import { constAuth } from "./Constant";
import { getCookie } from "./Cookies";

export const navigate = (url) => {
  const store = initializeStore();
  store.dispatch(actionSetHistory(url));
};

export const handleErrorAPI = (err, isToast = false) => {
  const object = err.response || {};
  const errorCodes = object.data ? object.data.errorCodes || [] : [];
  if (isToast) {
    // let toastError = "";
    errorCodes.forEach((ob) => {
      if (ob.field === "announceField") {
        // toastError = getMessageFromCode(ob.code);
      }
    });
    // toast.error(toastError || constMessages.DEFAULT_ERR_MESSAGE);
  }
  const errorCodesObject = {};
  errorCodes.forEach((ob) => {
    errorCodesObject[ob.field] = ob.code;
  });
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

export const isServer = typeof window === "undefined";
