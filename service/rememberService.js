import { API } from "../api/Api";
import {
  actionAddRememberIntoList,
  actionRemoveRememberFromList,
  actionSetIshowCreateModal,
  actionSetRememberGroupsList,
} from "../redux/actions/rememberGroupAction";
import { enpoint_remember } from "../utils/API_URL";
import { handleErrorAPI } from "../utils/Helper";

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

export const serviceGetRememberOfOwnerId = (ownerId) => {
  return (dispatch) => {
    API.get(enpoint_remember.fetRememberByOwnerId(ownerId))
      .then((res) => {
        dispatch(
          actionSetRememberGroupsList({
            list: res.data,
            total: res.data.length,
          })
        );
      })
      .catch((err) => {
        handleErrorAPI(err, "toast");
      });
  };
};

export const serviceDeleteRememberById = (id) => {
  return (dispatch) => [
    API.delete(enpoint_remember.deleteRememberById(id))
      .then((res) => {
        dispatch(actionRemoveRememberFromList(res.data));
      })
      .catch((err) => {
        handleErrorAPI(err, "toast");
      }),
  ];
};
