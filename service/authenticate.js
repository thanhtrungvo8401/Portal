import { API } from "../api/Api";
import { constAuth } from "../utils/Constant";
import { handleErrorAPI, navigate } from "../utils/Helper";
import { enpoint_auth } from "../utils/API_URL";
import { actionSetError } from "../redux/actions/errorActions";
import { toast } from "../components/Toast";
import { constCODE } from "../utils/CodeToMessages";
import {
  actionCloseLogin,
  actionSetIsLogined,
  actionSetUserLogin,
} from "../redux/actions/loginActions";
import { removeCookie, setCookie } from "../utils/Cookies";
import { appUrl } from "../utils/APP_URL";
import { actionSetUser } from "../redux/actions/userActions";

export const serviceSignUp = (user) => {
  return (dispatch) => {
    API.post(enpoint_auth.sign_up(), user)
      .then((res) => {
        toast.success(constCODE.SIGN_UP_SUCCESS);
        navigate(appUrl.studyRoom());
      })
      .catch((err) => {
        const object = handleErrorAPI(err, "toast");
        dispatch(actionSetError(object.errorCodesObject));
      });
  };
};

export const serviceLogin = (user) => {
  return (dispatch) => {
    API.post(enpoint_auth.login(), user)
      .then((res) => {
        const data = res.data;
        const jwt = data.token;
        setCookie(constAuth.JWT, jwt, 30);
        dispatch(actionSetIsLogined(true));
        dispatch(actionCloseLogin());
        dispatch(actionSetUserLogin({}));
      })
      .catch((err) => {
        const object = handleErrorAPI(err, "toast");
        dispatch(actionSetError(object.errorCodesObject));
      });
  };
};

export const serviceLogout = (actionAfterLogout) => {
  return (dispatch) => {
    API.post(enpoint_auth.logout())
      .then((res) => {
        if (typeof actionAfterLogout === "function") {
          actionAfterLogout();
        }
        dispatch(actionSetIsLogined(false));
        dispatch(actionSetUser({}));
        removeCookie(constAuth.JWT);
        navigate(appUrl.dashboard());
      })
      .catch((err) => {
        const object = handleErrorAPI(err, "toast");
        dispatch(actionSetError(object.errorCodesObject));
      });
  };
};
