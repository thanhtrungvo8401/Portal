import { API } from "../api/Api";
import { toast } from "../components/Toast";
import {
  actionAddRememberIntoList,
  actionRemoveRememberFromList,
  actionSetIshowCreateModal,
  actionSetIshowUpdateModal,
  actionSetRememberGroupsList,
  actionUpdateRememberInList,
} from "../redux/actions/rememberGroupAction";
import { enpoint_remember } from "../utils/API_URL";
import { codeToMessages, constCODE } from "../utils/CodeToMessages";
import { handleErrorAPI } from "../utils/Helper";

export const serviceCreateRemember = (remember) => {
  return (dispatch) => {
    API.post(enpoint_remember.create(), remember)
      .then((res) => {
        dispatch(actionAddRememberIntoList(res.data));
        dispatch(actionSetIshowCreateModal(false));
        toast.success(codeToMessages(constCODE.CREATE_REMEMBER_SUCCESS));
      })
      .catch((err) => {
        const object = handleErrorAPI(err, "toast");
        dispatch(actionSetError(object.errorCodesObject));
      });
  };
};

export const serviceUpdateRemember = (remember) => {
  return (dispatch) => {
    API.put(enpoint_remember.rememberWithId(remember.id), remember)
      .then((res) => {
        dispatch(actionUpdateRememberInList(res.data));
        dispatch(actionSetIshowUpdateModal(false));
        toast.success(codeToMessages(constCODE.UPDATE_REMEMBER_SUCCESS));
      })
      .catch((err) => {
        handleErrorAPI(err, "toast");
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
    API.delete(enpoint_remember.rememberWithId(id))
      .then((res) => {
        dispatch(actionRemoveRememberFromList(res.data));
        toast.success(codeToMessages(constCODE.DELETE_REMEMBER_SUCCESS));
      })
      .catch((err) => {
        handleErrorAPI(err, "toast");
      }),
  ];
};
