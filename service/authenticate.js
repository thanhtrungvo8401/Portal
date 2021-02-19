import { API } from "../api/Api";
import { constAuth, constPages } from "../utils/Constant";
import { handleErrorAPI, navigate } from "../utils/Helper";
import { enpoint_auth } from "./ApiUrl";
import { actionSetError } from "../redux/actions/errorActions";
import { toast } from "../components/Toast";
import { constCODE } from "../utils/CodeToMessages";
import {
  actionCloseLogin,
  actionSetIsLogined,
} from "../redux/actions/loginActions";
import { setCookie } from "../utils/Cookies";

export const serviceSignUp = (user) => {
  return (dispatch) => {
    API.post(enpoint_auth.sign_up, user)
      .then((res) => {
        toast.success(constCODE.SIGN_UP_SUCCESS);
        navigate(constPages.studyRoom);
      })
      .catch((err) => {
        const object = handleErrorAPI(err, "toast");
        dispatch(actionSetError(object.errorCodesObject));
      });
  };
};

export const serviceLogin = (user) => {
  return (dispatch) => {
    API.post(enpoint_auth.login, user)
      .then((res) => {
        const data = res.data;
        const jwt = data.token;
        setCookie(constAuth.JWT, jwt, 30);
        dispatch(actionSetIsLogined(true));
        dispatch(actionCloseLogin());
      })
      .catch((err) => {
        const object = handleErrorAPI(err, "toast");
        dispatch(actionSetError(object.errorCodesObject));
      });
  };
};

export const serviceLogout = (user) => {
  return (dispatch) => {};
};
