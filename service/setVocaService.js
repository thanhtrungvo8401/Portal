import { API } from "../api/Api";
import { toast } from "../components/Toast";
import { actionSetError } from "../redux/actions/errorActions";
import {
  actionAddSetVocaToList,
  actionRemoveSetVocaFromList,
  actionSetIsShowSetVocaModal,
  actionSet_SetVoca_List,
  actionUpdateSetVocaInList,
} from "../redux/actions/setVocasActions";
import { enpoint_setVoca } from "../utils/API_URL";
import { codeToMessages, constCODE } from "../utils/CodeToMessages";
import { handleErrorAPI } from "../utils/Helper";

export const serviceGetSetVocas = (authId) => {
  return (dispatch) => {
    API.get(enpoint_setVoca.getSetVocasByAuthId(authId))
      .then((res) => {
        dispatch(actionSet_SetVoca_List(res.data));
      })
      .catch((err) => {
        const object = handleErrorAPI(err, "toast");
        dispatch(actionSetError(object.errorCodesObject));
      });
  };
};

export const serviceCreateSetVoca = (setVoca) => {
  return (dispatch) => {
    API.post(enpoint_setVoca.createSetVocas(), setVoca)
      .then((res) => {
        dispatch(actionAddSetVocaToList(res.data));
        dispatch(actionSetIsShowSetVocaModal(false));
        toast.success(codeToMessages(constCODE.CREATE_SET_VOCAS_SUCCESS));
      })
      .catch((err) => {
        const object = handleErrorAPI(err, "toast");
        dispatch(actionSetError(object.errorCodesObject));
      });
  };
};

export const serviceUpdateSetVoca = (setVoca) => {
  return (dispatch) => {
    API.put(enpoint_setVoca.updateSetVocas(setVoca.id), setVoca)
      .then((res) => {
        dispatch(actionUpdateSetVocaInList(res.data));
        dispatch(actionSetIsShowSetVocaModal(false));
        toast.success(codeToMessages(constCODE.UPDATE_SET_VOCAS_SUCCESS));
      })
      .catch((err) => {
        const object = handleErrorAPI(err, "toast");
        dispatch(actionSetError(object.errorCodesObject));
      });
  };
};

export const serviceDeleteSetVocas = (id) => {
  return (dispatch) => {
    API.delete(enpoint_setVoca.deleteById(id))
      .then((res) => {
        dispatch(actionRemoveSetVocaFromList(res.data));
        toast.success(codeToMessages(constCODE.DELETE_SET_VOCAS_SUCCESS));
      })
      .catch((err) => {
        const object = handleErrorAPI(err, "toast");
        dispatch(actionSetError(object.errorCodesObject));
      });
  };
};
