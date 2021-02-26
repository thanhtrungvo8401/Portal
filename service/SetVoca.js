import { API } from "../api/Api";
import { actionSetError } from "../redux/actions/errorActions";
import { actionSetGroupVocasList } from "../redux/actions/setVocasActions";
import { enpoint_setVoca } from "../utils/API_URL";
import { handleErrorAPI } from "../utils/Helper";

export const serviceCreateSetVoca = (setVoca) => {
  return (dispatch) => {
    API.post(enpoint_setVoca.createSetVocas(), setVoca)
      .then((res) => {})
      .catch((err) => {});
  };
};

export const serviceGetSetVocas = (authId) => {
  return (dispatch) => {
    API.get(enpoint_setVoca.getSetVocasByAuthId(authId))
      .then((res) => {
        console.log(res.data);
        const listSetVocas = res.data;
        dispatch(actionSetGroupVocasList(listSetVocas));
      })
      .catch((err) => {
        const object = handleErrorAPI(err, "toast");
        dispatch(actionSetError(object.errorCodesObject));
      });
  };
};
