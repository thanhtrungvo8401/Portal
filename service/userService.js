import { API } from "../api/Api";
import { actionSetError } from "../redux/actions/errorActions";
import { enpoint_user } from "../utils/API_URL";
import { storageKey } from "../utils/Constant";
import { handleErrorAPI } from "../utils/Helper";
import { localStorageHelper } from  "../utils/storageHelper";
export const serviceGetProfile = () => {
  return (dispatch) => {
    API.get(enpoint_user.getProfile())
      .then((res) => {
        localStorageHelper.set(storageKey.MY_PROFILE, JSON.stringify(res.data));
      })
      .catch((err) => {
        const object = handleErrorAPI(err, "toast");
        dispatch(actionSetError(object.errorCodesObject));
      });
  };
};
