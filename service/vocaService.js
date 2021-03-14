import { API } from "../api/Api";
import { toast } from "../components/Toast";
import { actionSetError } from "../redux/actions/errorActions";
import {
  actionAddVocabularyToList,
  actionRemoveVocabularyFromList,
  actionResetVocaListEditing,
  actionSetVocabularyEditing,
  actionSetVocabularyList,
  actionSetVocabularyObject,
  actionUpdateVocaInList,
} from "../redux/actions/vocaActions";
import { enpoint_voca } from "../utils/API_URL";
import { appUrl } from "../utils/APP_URL";
import { codeToMessages, constCODE } from "../utils/CodeToMessages";
import { handleErrorAPI, navigate } from "../utils/Helper";

export const serviceFetVocaBySetId = (setId) => {
  return (dispatch) => {
    API.get(enpoint_voca.fetVocas(setId))
      .then((res) => {
        const listVoca = res.data;
        dispatch(actionSetVocabularyList(listVoca));
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

export const serviceCreateVoca = (voca) => {
  return (dispatch) => {
    API.post(enpoint_voca.create(), voca)
      .then((res) => {
        const voca = res.data;
        dispatch(actionResetVocaListEditing());
        dispatch(actionAddVocabularyToList(voca));
        dispatch(actionSetVocabularyObject({}));
        toast.success(codeToMessages(constCODE.CREATE_VOCA_SUCCESS));
      })
      .catch((err) => {
        const object = handleErrorAPI(err, "toast");
        dispatch(actionSetError(object.errorCodesObject));
      });
  };
};

export const serviceUpdateVoca = (voca, actionCloseExpand) => {
  return (dispatch) => {
    API.put(enpoint_voca.update(voca.id), voca)
      .then((res) => {
        dispatch(actionResetVocaListEditing());
        dispatch(actionUpdateVocaInList(voca));
        dispatch(actionSetVocabularyEditing({}))
        if (actionCloseExpand) {
          actionCloseExpand();
        }
        toast.success(codeToMessages(constCODE.UPDATE_VOCA_SUCCESS));
      })
      .catch((err) => {
        const object = handleErrorAPI(err, "toast");
        dispatch(actionSetError(object.errorCodesObject));
      });
  };
};

export const serviceDeleteVocaById = (id) => {
  return (dispatch) => {
    API.delete(enpoint_voca.delete(id))
      .then((res) => {
        dispatch(actionRemoveVocabularyFromList(id));
        toast.success(codeToMessages(constCODE.DELETE_VOCA_SUCCESS));
      })
      .catch((err) => {
        const object = handleErrorAPI(err, "toast");
        dispatch(actionSetError(object.errorCodesObject));
      });
  };
};
