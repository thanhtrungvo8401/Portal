import { API } from "../api/Api";
import { actionSetError } from "../redux/actions/errorActions";
import {
  actionAddVocabularyToList,
  actionSetVocabularyList,
} from "../redux/actions/vocaActions";
import { enpoint_voca } from "../utils/API_URL";
import { handleErrorAPI } from "../utils/Helper";

export const serviceFetVocaBySetId = (setId) => {
  return (dispatch) => {
    API.get(enpoint_voca.fetVocas(setId))
      .then((res) => {
        const listVoca = res.data;
        dispatch(actionSetVocabularyList(listVoca));
      })
      .catch((err) => {
        const object = handleErrorAPI(err, "toast");
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
      })
      .catch((err) => {
        const object = handleErrorAPI(err, "toast");
        dispatch(actionSetError(object.errorCodesObject));
      });
  };
};
