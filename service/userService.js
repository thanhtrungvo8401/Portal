import { API } from "../api/Api";
import { actionSetError } from "../redux/actions/errorActions";
import { enpoint_user } from "../utils/API_URL";
import { handleErrorAPI } from "../utils/Helper";

export const serviceGetProfile = () => {
  return (dispatch) => {
    API.get(enpoint_user.getProfile())
      .then((res) => {
      })
      .catch((err) => {
        const object = handleErrorAPI(err, "toast");
        dispatch(actionSetError(object.errorCodesObject));
      });
  };
};
