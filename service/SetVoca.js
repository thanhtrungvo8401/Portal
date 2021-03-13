import { API } from "../api/Api";
import { toast } from "../components/Toast";
import { actionSetError } from "../redux/actions/errorActions";
import {
  actionAddGroupVocasItem,
  actionRemoveGroupVocasItem,
  actionSetGroupVocasList,
  actionSetvocaObject,
} from "../redux/actions/setVocasActions";
import { enpoint_setVoca } from "../utils/API_URL";
import { appUrl } from "../utils/APP_URL";
import { codeToMessages, constCODE } from "../utils/CodeToMessages";
import { handleErrorAPI, navigate } from "../utils/Helper";

export const serviceCreateSetVoca = (setVoca) => {
  return (dispatch) => {
    API.post(enpoint_setVoca.createSetVocas(), setVoca)
      .then((res) => {
        const newSetVoca = res.data;
        dispatch(actionAddGroupVocasItem(newSetVoca));
        toast.success(codeToMessages(constCODE.CREATE_SET_VOCAS_SUCCESS));
      })
      .catch((err) => {
        const object = handleErrorAPI(err, "toast");
        dispatch(actionSetError(object.errorCodesObject));
      });
  };
};

export const serviceGetSetVocas = (authId) => {
  return (dispatch) => {
    API.get(enpoint_setVoca.getSetVocasByAuthId(authId))
      .then((res) => {
        const listSetVocas = res.data;
        dispatch(actionSetGroupVocasList(listSetVocas));
      })
      .catch((err) => {
        const object = handleErrorAPI(err, "toast");
        dispatch(actionSetError(object.errorCodesObject));
      });
  };
};

export const serviceGetSetVocaDetail = (id) => {
  return (dispatch) => {
    API.get(enpoint_setVoca.getSetVocaDetailById(id))
      .then((res) => {
        const setVoca = res.data;
        dispatch(actionSetvocaObject(setVoca));
      })
      .catch((err) => {
        const object = handleErrorAPI(err, "toast");
        const status = object.status;
        if (status === 400) {
          navigate(appUrl.studyRoom());
        }
        dispatch(actionSetError(object.errorCodesObject));
      });
  };
};

export const serviceDeleteSetVocas = (id) => {
  return (dispatch) => {
    API.delete(enpoint_setVoca.deleteById(id))
      .then((res) => {
        const deletedItem = res.data;
        dispatch(actionRemoveGroupVocasItem(deletedItem));
        toast.success(codeToMessages(constCODE.DELETE_SET_VOCAS_SUCCESS));
      })
      .catch((err) => {
        const object = handleErrorAPI(err, "toast");
        dispatch(actionSetError(object.errorCodesObject));
      });
  };
};
