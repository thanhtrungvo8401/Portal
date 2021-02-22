import { RESET_GROUP_VOCAS_LIST, SET_GROUP_VOCAS_LIST } from "../types";

export const actionSetGroupVocasList = (payload) => {
  return {
    type: SET_GROUP_VOCAS_LIST,
    payload,
  };
};

export const actionResetGroupVocasList = () => {
  return {
    type: RESET_GROUP_VOCAS_LIST,
  };
};
