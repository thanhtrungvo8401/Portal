import { API } from "../api/Api";
import { actionSetError } from "../redux/actions/errorActions";
import { actionSetUser } from "../redux/actions/userActions";
import { enpoint_user } from "../utils/API_URL";
import { handleErrorAPI } from "../utils/Helper";
import moment from "moment-timezone";

export const serviceGetProfile = () => {
  return (dispatch) => {
    API.get(enpoint_user.getProfile())
      .then((res) => {
        const user = res.data;
        const expiredAt = moment(Date.now()).add(1, "hour");
        user.expiredAt = expiredAt;
        dispatch(actionSetUser(user));
      })
      .catch((err) => {
        const object = handleErrorAPI(err, "toast");
        dispatch(actionSetError(object.errorCodesObject));
      });
  };
};
