import { actionSetHistory } from "../redux/actions/historyActions";
import { initializeStore } from "../redux/store";

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
