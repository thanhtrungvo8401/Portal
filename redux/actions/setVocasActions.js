import {
  SET_VOCA,
} from "../types";

export const actionSetGroupVocasList = (payload) => {
  return {
    type: SET_VOCA.GET__SET_VOCAS_LIST,
    payload,
  };
};

export const actionAddGroupVocasItem = (payload) => {
  return {
    type: SET_VOCA.ADD__SET_VOCAS_TO_LIST,
    payload,
  };
};

export const actionRemoveGroupVocasItem = (payload) => {
  return {
    type: SET_VOCA.REMOVE__SET_VOCAS_FROM_LIST,
    payload,
  };
};

export const actionResetGroupVocasList = () => {
  return {
    type: SET_VOCA.RESET__SET_VOCAS_LIST,
  };
};

export const actionSetvocaObject = (payload) => {
  return {
    type: SET_VOCA.SET__SET_VOCAS_OBJECT,
    payload: payload,
  };
};
