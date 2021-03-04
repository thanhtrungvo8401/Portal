import {
  ADD_GROUP_VOCAS_ITEM,
  REMOVE_GROUP_VOCAS_ITEM,
  RESET_GROUP_VOCAS_LIST,
  SET_GROUP_VOCAS_LIST,
  SET_VOCA_OBJECT,
} from "../types";

export const actionSetGroupVocasList = (payload) => {
  return {
    type: SET_GROUP_VOCAS_LIST,
    payload,
  };
};

export const actionAddGroupVocasItem = (payload) => {
  return {
    type: ADD_GROUP_VOCAS_ITEM,
    payload,
  };
};

export const actionRemoveGroupVocasItem = (payload) => {
  return {
    type: REMOVE_GROUP_VOCAS_ITEM,
    payload,
  };
};

export const actionResetGroupVocasList = () => {
  return {
    type: RESET_GROUP_VOCAS_LIST,
  };
};

export const actionSetvocaObject = (payload) => {
  return {
    type: SET_VOCA_OBJECT,
    payload: payload,
  };
};
