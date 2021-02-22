import { API } from "../api/Api";
import { enpoint_setVoca } from "../utils/API_URL";

export const serviceCreateSetVoca = (setVoca) => {
  return (dispatch) => {
    API.post(enpoint_setVoca.setVocas(), setVoca)
      .then((res) => {})
      .catch((err) => {});
  };
};
