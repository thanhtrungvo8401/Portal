import { API } from "../api/Api";
import { enpoint_setVoca } from "../utils/API_URL";

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
      .then((res) => {})
      .catch((err) => {});
  };
};
