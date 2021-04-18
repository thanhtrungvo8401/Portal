import { API } from "../api/Api";
import { actionAddRememberIntoList, actionSetIshowCreateModal } from "../redux/actions/rememberGroupAction";
import { enpoint_remember } from "../utils/API_URL";

export const serviceCreateRemember = (remember) => {
  return (dispatch) => {
    API.post(enpoint_remember.create(), remember)
      .then((res) => {
        dispatch(actionAddRememberIntoList(res.data));
        dispatch(actionSetIshowCreateModal(false));
      })
      .catch((err) => {
        const object = handleErrorAPI(err, "toast");
        dispatch(actionSetError(object.errorCodesObject));
      });
  };
};
