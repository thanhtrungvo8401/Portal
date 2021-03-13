import { API } from "../api/Api";
import { actionSetError } from "../redux/actions/errorActions";
import {
  actionAddVocabularyToList,
  actionSetShowCreateVocaForm,
  actionSetVocabularyList,
} from "../redux/actions/vocaActions";
import { enpoint_voca } from "../utils/API_URL";
import { appUrl } from "../utils/APP_URL";
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
        dispatch(actionAddVocabularyToList(voca));
        dispatch(actionSetShowCreateVocaForm(false));
      })
      .catch((err) => {
        const object = handleErrorAPI(err, "toast");
        dispatch(actionSetError(object.errorCodesObject));
      });
  };
};
